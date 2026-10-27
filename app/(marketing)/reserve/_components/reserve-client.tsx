'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CreditCard, Shield, AlertTriangle, Check, ArrowRight, Copy } from 'lucide-react';
import { toast } from 'sonner';

export function ReserveClient() {
  const { data: session, status } = useSession();
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState('US');
  const [loginForm, setLoginForm] = useState({ email: '', password: '', name: '' });
  const [isSignup, setIsSignup] = useState(true);
  const [loading, setLoading] = useState(false);
  const [reservationRef, setReservationRef] = useState('');

  // Auto advance to step 2 if not logged in, step 3 if logged in
  const effectiveStep = step === 1 ? 1 : !session?.user && step >= 2 ? 2 : step;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignup) {
        const res = await fetch('/api/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(loginForm) });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) { toast.error(data?.error ?? 'Signup failed'); setLoading(false); return; }
      }
      const result = await signIn('credentials', { email: loginForm.email, password: loginForm.password, redirect: false });
      if (result?.ok) { setStep(3); toast.success('Signed in!'); }
      else { toast.error('Invalid credentials'); }
    } catch { toast.error('An error occurred'); }
    setLoading(false);
  };

  const handleSandboxCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/reservations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ country }) });
      const data = await res.json().catch(() => ({}));
      if (res.ok) { setReservationRef(data?.referenceCode ?? 'JXN-XXXX-XXXX'); setStep(4); toast.success('Reservation created!'); }
      else { toast.error(data?.error ?? 'Reservation failed'); }
    } catch { toast.error('Network error'); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-obsidian">
      <div className="max-w-[700px] mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-10">
          <p className="text-copper text-xs font-bold uppercase tracking-[0.3em] mb-4">RESERVE</p>
          <h1 className="hero-headline text-[clamp(1.8rem,5vw,3rem)] text-alabaster mb-2" style={{ fontFamily: 'var(--font-display)' }}>JUMPPACK 2.0 RESERVATION</h1>
        </div>

        {/* Sandbox Warning */}
        <div className="bg-gold/10 border border-gold/30 px-4 py-3 mb-8 text-sm text-gold flex items-start gap-2" style={{ borderRadius: '12px' }}>
          <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
          <div><strong>SANDBOX MODE</strong> — No real payments are taken. This is a preview of the reservation flow. Use card 4242 4242 4242 4242 for testing.</div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 flex items-center justify-center text-xs font-bold ${effectiveStep >= s ? 'bg-copper text-white' : 'bg-carbon text-titanium border border-white/10'}`} style={{ borderRadius: '12px' }}>{effectiveStep > s ? <Check size={14} /> : s}</div>
              {s < 4 && <div className={`flex-1 h-px ${effectiveStep > s ? 'bg-copper' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Product */}
        {effectiveStep === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-carbon border border-white/5 p-6 mb-6" style={{ borderRadius: '12px' }}>
              <h2 className="text-alabaster font-bold text-lg mb-4">JumpPack 2.0 Reservation</h2>
              <div className="flex items-center justify-between mb-4">
                <span className="text-titanium text-sm">Country</span>
                <select value={country} onChange={(e) => setCountry(e.target.value)} className="bg-obsidian border border-white/10 px-3 py-2 text-sm text-alabaster focus:border-copper focus:outline-none" style={{ borderRadius: '12px' }}>
                  <option value="US">United States (USD)</option>
                  <option value="UK">United Kingdom (GBP)</option>
                  <option value="EU">European Union (EUR)</option>
                  <option value="AU">Australia (AUD)</option>
                  <option value="CA">Canada (CAD)</option>
                </select>
              </div>
              <div className="border-t border-white/5 pt-4">
                <div className="flex justify-between text-sm mb-2"><span className="text-titanium">Reservation deposit</span><span className="text-alabaster font-bold">$150</span></div>
                <div className="flex justify-between text-sm mb-2"><span className="text-titanium">Balance on dispatch</span><span className="text-alabaster">$499</span></div>
                <div className="flex justify-between text-sm font-bold border-t border-white/5 pt-2"><span className="text-titanium">Total (proposed)</span><span className="text-gold">$649</span></div>
              </div>
              <p className="text-xs text-titanium mt-4 leading-relaxed">Refundable deposit. Balance payable on dispatch. Local taxes may apply. Prices proposed and subject to commercial approval.</p>
            </div>
            <button onClick={() => setStep(session?.user ? 3 : 2)} className="w-full bg-copper text-white py-4 text-sm font-bold uppercase tracking-wider hover:bg-copperHover transition-colors flex items-center justify-center gap-2" style={{ borderRadius: '12px' }}>CONTINUE <ArrowRight size={16} /></button>
          </motion.div>
        )}

        {/* Step 2: Auth */}
        {effectiveStep === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-carbon border border-white/5 p-6 mb-6" style={{ borderRadius: '12px' }}>
              <h2 className="text-alabaster font-bold text-lg mb-4">{isSignup ? 'Create Account' : 'Sign In'}</h2>
              <form onSubmit={handleAuth} className="flex flex-col gap-4">
                {isSignup && <input type="text" placeholder="Full Name" value={loginForm.name} onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })} className="bg-obsidian border border-white/10 px-4 py-3 text-sm text-alabaster placeholder-titanium/50 focus:border-copper focus:outline-none" style={{ borderRadius: '12px' }} />}
                <input type="email" placeholder="Email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} className="bg-obsidian border border-white/10 px-4 py-3 text-sm text-alabaster placeholder-titanium/50 focus:border-copper focus:outline-none" style={{ borderRadius: '12px' }} required />
                <input type="password" placeholder="Password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} className="bg-obsidian border border-white/10 px-4 py-3 text-sm text-alabaster placeholder-titanium/50 focus:border-copper focus:outline-none" style={{ borderRadius: '12px' }} required />
                <button type="submit" disabled={loading} className="bg-copper text-white py-3 text-sm font-bold uppercase tracking-wider hover:bg-copperHover transition-colors disabled:opacity-50" style={{ borderRadius: '12px' }}>{loading ? 'PROCESSING...' : isSignup ? 'CREATE ACCOUNT' : 'SIGN IN'}</button>
              </form>
              <button onClick={() => setIsSignup(!isSignup)} className="mt-4 text-sm text-titanium hover:text-copper transition-colors">{isSignup ? 'Already have an account? Sign in' : 'Need an account? Sign up'}</button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Sandbox Checkout */}
        {effectiveStep === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-gold/10 border border-gold/30 px-4 py-3 mb-6 text-sm text-gold" style={{ borderRadius: '12px' }}>
              <AlertTriangle size={16} className="inline mr-2" />SANDBOX MODE — No real payments are taken.
            </div>
            <div className="bg-carbon border border-white/5 p-6 mb-6" style={{ borderRadius: '12px' }}>
              <h2 className="text-alabaster font-bold text-lg mb-4">Order Summary</h2>
              <div className="flex justify-between text-sm mb-2"><span className="text-titanium">JumpPack 2.0 Reservation Deposit</span><span className="text-alabaster font-bold">$150.00</span></div>
              <div className="border-t border-white/5 pt-4 mt-4">
                <p className="text-xs text-titanium mb-4">Test card: 4242 4242 4242 4242, any future expiry, any CVC</p>
              </div>
              <button onClick={handleSandboxCheckout} disabled={loading} className="w-full bg-copper text-white py-4 text-sm font-bold uppercase tracking-wider hover:bg-copperHover transition-colors disabled:opacity-50 flex items-center justify-center gap-2" style={{ borderRadius: '12px' }}><CreditCard size={16} />{loading ? 'PROCESSING...' : 'COMPLETE SANDBOX RESERVATION'}</button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Confirmation */}
        {effectiveStep === 4 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="bg-carbon border border-copper/20 p-8 text-center" style={{ borderRadius: '12px' }}>
              <div className="w-16 h-16 bg-copper flex items-center justify-center mx-auto mb-6" style={{ borderRadius: '12px' }}><Check size={32} className="text-obsidian" /></div>
              <h2 className="text-alabaster text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>RESERVATION CONFIRMED</h2>
              <p className="text-titanium text-sm mb-6">(Sandbox — No real payment taken)</p>
              <div className="bg-obsidian border border-white/5 px-6 py-4 mb-6 inline-block" style={{ borderRadius: '12px' }}>
                <p className="text-xs text-titanium mb-1">Reservation Reference</p>
                <p className="text-2xl font-bold text-copper font-mono flex items-center gap-2 justify-center">
                  {reservationRef}
                  <button onClick={() => { navigator.clipboard?.writeText?.(reservationRef); toast.success('Copied!'); }} className="text-titanium hover:text-copper"><Copy size={16} /></button>
                </p>
              </div>
              <div className="text-left max-w-md mx-auto">
                <h3 className="text-alabaster font-bold text-sm mb-3">What happens next:</h3>
                <div className="flex flex-col gap-3">
                  {['Founding Rider status activated', 'Access to Jump Zone coaching content', 'Regular production updates via email', 'Balance payment collected before dispatch'].map((item, i) => (
                    <div key={i} className="flex items-start gap-2"><Check size={14} className="text-copper mt-0.5 flex-shrink-0" /><span className="text-sm text-titanium">{item}</span></div>
                  ))}
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/jump-zone" className="bg-copper text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-copperHover transition-colors" style={{ borderRadius: '12px' }}>EXPLORE JUMP ZONE</Link>
                <Link href="/dashboard" className="border border-white/20 text-alabaster px-6 py-3 text-sm font-bold uppercase tracking-wider hover:border-copper hover:text-copper transition-colors" style={{ borderRadius: '12px' }}>VIEW DASHBOARD</Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
