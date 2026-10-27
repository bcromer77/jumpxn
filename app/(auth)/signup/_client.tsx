'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export function SignupClient() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((form.password?.length ?? 0) < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { toast.error(data?.error ?? 'Signup failed'); setLoading(false); return; }
      const result = await signIn('credentials', { email: form.email, password: form.password, redirect: false });
      if (result?.ok) { router.replace('/dashboard'); }
      else { toast.error('Account created but auto-login failed. Please sign in.'); router.push('/login'); }
    } catch { toast.error('An error occurred'); }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md px-4">
      <div className="text-center mb-8">
        <span className="text-copper text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>JUMPXN</span>
        <h1 className="text-alabaster text-2xl font-bold mt-4" style={{ fontFamily: 'var(--font-display)' }}>JOIN THE RIDE</h1>
        <p className="text-titanium text-sm mt-2">Create your account and start your journey.</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-carbon border border-white/10 px-4 py-3 text-sm text-alabaster placeholder-titanium/50 focus:border-copper focus:outline-none" style={{ borderRadius: '12px' }} />
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-carbon border border-white/10 px-4 py-3 text-sm text-alabaster placeholder-titanium/50 focus:border-copper focus:outline-none" style={{ borderRadius: '12px' }} required />
        <input type="password" placeholder="Password (min 6 characters)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="bg-carbon border border-white/10 px-4 py-3 text-sm text-alabaster placeholder-titanium/50 focus:border-copper focus:outline-none" style={{ borderRadius: '12px' }} required />
        <button type="submit" disabled={loading} className="bg-copper text-white py-3 text-sm font-bold uppercase tracking-wider hover:bg-copperHover transition-colors disabled:opacity-50 flex items-center justify-center gap-2" style={{ borderRadius: '12px' }}><UserPlus size={16} />{loading ? 'CREATING...' : 'CREATE ACCOUNT'}</button>
      </form>
      <p className="text-center text-sm text-titanium mt-6">Already have an account? <Link href="/login" className="text-copper hover:underline">Sign in</Link></p>
    </div>
  );
}
