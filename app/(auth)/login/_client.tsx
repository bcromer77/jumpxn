'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { toast } from 'sonner';

export function LoginClient() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn('credentials', { email: form.email, password: form.password, redirect: false });
      if (result?.ok) { router.replace('/dashboard'); }
      else { toast.error('Invalid email or password'); }
    } catch { toast.error('An error occurred'); }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md px-4">
      <div className="text-center mb-8">
        <span className="text-copper text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>JUMPXN</span>
        <h1 className="text-alabaster text-2xl font-bold mt-4" style={{ fontFamily: 'var(--font-display)' }}>SIGN IN</h1>
        <p className="text-titanium text-sm mt-2">Welcome back, rider.</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-carbon border border-white/10 px-4 py-3 text-sm text-alabaster placeholder-titanium/50 focus:border-copper focus:outline-none" style={{ borderRadius: '12px' }} required />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="bg-carbon border border-white/10 px-4 py-3 text-sm text-alabaster placeholder-titanium/50 focus:border-copper focus:outline-none" style={{ borderRadius: '12px' }} required />
        <button type="submit" disabled={loading} className="bg-copper text-white py-3 text-sm font-bold uppercase tracking-wider hover:bg-copperHover transition-colors disabled:opacity-50 flex items-center justify-center gap-2" style={{ borderRadius: '12px' }}><LogIn size={16} />{loading ? 'SIGNING IN...' : 'SIGN IN'}</button>
      </form>
      <p className="text-center text-sm text-titanium mt-6">Don&apos;t have an account? <Link href="/signup" className="text-copper hover:underline">Sign up</Link></p>
    </div>
  );
}
