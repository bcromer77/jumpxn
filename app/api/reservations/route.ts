export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { generateReservationCode } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;
    const body = await request.json().catch(() => ({}));
    const country = body?.country ?? 'US';

    // Check for existing active reservation
    const existing = await prisma.reservation.findFirst({
      where: { userId, status: { notIn: ['CANCELLED'] } },
    });
    if (existing) {
      return NextResponse.json({ error: 'You already have an active reservation', referenceCode: existing.referenceCode }, { status: 409 });
    }

    // Generate unique reference code
    let referenceCode = generateReservationCode();
    let attempts = 0;
    while (attempts < 10) {
      const dup = await prisma.reservation.findUnique({ where: { referenceCode } });
      if (!dup) break;
      referenceCode = generateReservationCode();
      attempts++;
    }

    // Create reservation (sandbox - mark as deposit paid)
    const reservation = await prisma.reservation.create({
      data: {
        userId,
        referenceCode,
        status: 'DEPOSIT_PAID',
        depositPaid: true,
        depositAmount: 150,
        balanceAmount: 499,
        country,
      },
    });

    // Create Founding Rider record
    const refCode = `FR-${referenceCode.replace('JXN-', '')}`;
    await prisma.foundingRider.create({
      data: {
        userId,
        reservationId: reservation.id,
        referralCode: refCode,
      },
    });

    // Create initial achievements
    await prisma.achievement.createMany({
      data: [
        { userId, type: 'FOUNDING_RIDER', title: 'Founding Rider' },
        { userId, type: 'FIRST_RESERVATION', title: 'First Reservation' },
      ],
      skipDuplicates: true,
    });

    console.log(`[SANDBOX] Reservation created: ${referenceCode} for user ${userId}`);

    return NextResponse.json({ referenceCode, status: 'DEPOSIT_PAID' }, { status: 201 });
  } catch (err: any) {
    console.error('Reservation error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const reservations = await prisma.reservation.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(reservations);
  } catch (err: any) {
    console.error('Reservations fetch error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
