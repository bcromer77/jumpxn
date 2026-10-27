export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const [users, reservations, foundingRiders, supportRequests] = await Promise.all([
      prisma.user.count(),
      prisma.reservation.count(),
      prisma.foundingRider.count(),
      prisma.supportRequest.count(),
    ]);
    return NextResponse.json({ users, reservations, foundingRiders, supportRequests });
  } catch (err: any) {
    console.error('Admin stats error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
