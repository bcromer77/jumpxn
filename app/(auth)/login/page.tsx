import { LoginClient } from './_client';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Sign In' };

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect('/dashboard');
  return <LoginClient />;
}
