export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json().catch(() => ({}));
    const { challengeId } = body ?? {};
    if (!challengeId) {
      return NextResponse.json({ error: 'Challenge ID required' }, { status: 400 });
    }
    const entry = await prisma.challengeEntry.upsert({
      where: { userId_challengeId: { userId: session.user.id, challengeId } },
      create: { userId: session.user.id, challengeId },
      update: {},
    });
    return NextResponse.json(entry, { status: 201 });
  } catch (err: any) {
    console.error('Challenge join error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
