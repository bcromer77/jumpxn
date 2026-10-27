import { auth } from '@/auth';
import { JumpZonePublic } from './_components/jump-zone-public';
import { JumpZoneDashboard } from './_components/jump-zone-dashboard';

export const metadata = { title: 'Jump Zone' };

export default async function JumpZonePage() {
  const session = await auth();
  if (session?.user) {
    return <JumpZoneDashboard userId={session.user.id ?? ''} userName={session.user.name ?? 'Rider'} />;
  }
  return <JumpZonePublic />;
}
