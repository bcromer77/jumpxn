import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { DashboardClient } from './_client';

export const metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');
  const userId = session.user.id ?? '';

  const reservation = await prisma.reservation.findFirst({ where: { userId }, orderBy: { createdAt: 'desc' } });
  const foundingRider = await prisma.foundingRider.findUnique({ where: { userId } });
  const achievements = await prisma.achievement.findMany({ where: { userId } });

  return (
    <DashboardClient
      userName={session.user.name ?? 'Rider'}
      reservation={reservation ? { referenceCode: reservation.referenceCode, status: reservation.status, depositPaid: reservation.depositPaid, createdAt: reservation.createdAt.toISOString() } : null}
      isFoundingRider={!!foundingRider}
      referralCode={foundingRider?.referralCode ?? null}
      achievementCount={achievements?.length ?? 0}
    />
  );
}
