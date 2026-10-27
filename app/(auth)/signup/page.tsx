import { SignupClient } from './_client';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Sign Up' };

export default async function SignupPage() {
  const session = await auth();
  if (session?.user) redirect('/dashboard');
  return <SignupClient />;
}
