export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await auth();
    const body = await request.json().catch(() => ({}));
    const { email, subject, message } = body ?? {};

    if (!email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await prisma.supportRequest.create({
      data: {
        userId: session?.user?.id ?? null,
        email: String(email),
        subject: String(subject),
        message: String(message),
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: any) {
    console.error('Support request error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
