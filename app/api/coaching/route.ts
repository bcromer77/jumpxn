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
    const { lessonId, discipline, action } = body ?? {};
    if (!lessonId || !discipline) {
      return NextResponse.json({ error: 'Lesson ID and discipline required' }, { status: 400 });
    }
    const saved = action === 'save';
    const progress = await prisma.coachingProgress.upsert({
      where: { userId_lessonId: { userId: session.user.id, lessonId } },
      create: { userId: session.user.id, lessonId, discipline, saved },
      update: { saved },
    });
    return NextResponse.json(progress);
  } catch (err: any) {
    console.error('Coaching error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
