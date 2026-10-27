import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { AdminClient } from './_client';

export const metadata = { title: 'Admin Dashboard' };

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');
  if ((session.user as any)?.role !== 'ADMIN') redirect('/dashboard');

  const [userCount, reservationCount, foundingRiderCount, supportCount] = await Promise.all([
    prisma.user.count(),
    prisma.reservation.count(),
    prisma.foundingRider.count(),
    prisma.supportRequest.count(),
  ]);

  const reservations = await prisma.reservation.findMany({
    take: 20,
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { email: true, name: true } } },
  });

  const depositRevenue = await prisma.reservation.aggregate({ _sum: { depositAmount: true }, where: { depositPaid: true } });
  const cancelledCount = await prisma.reservation.count({ where: { status: 'CANCELLED' } });

  const countryDist = await prisma.reservation.groupBy({ by: ['country'], _count: true });

  return (
    <AdminClient
      stats={{
        users: userCount,
        reservations: reservationCount,
        foundingRiders: foundingRiderCount,
        supportRequests: supportCount,
        depositRevenue: depositRevenue._sum.depositAmount ?? 0,
        cancelled: cancelledCount,
        countryDistribution: (countryDist ?? []).map((c: any) => ({ country: c.country, count: c._count })),
      }}
      recentReservations={(reservations ?? []).map((r: any) => ({
        id: r.id,
        referenceCode: r.referenceCode,
        status: r.status,
        depositPaid: r.depositPaid,
        country: r.country,
        createdAt: r.createdAt.toISOString(),
        userEmail: r.user?.email ?? '',
        userName: r.user?.name ?? '',
      }))}
    />
  );
}
