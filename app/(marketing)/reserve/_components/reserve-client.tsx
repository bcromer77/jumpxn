'use client';
import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, Check, ArrowRight, Copy, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { usePlayer } from '@/components/providers';

export function ReserveClient() {
  const { data: session } = useSession();
  const { price } = usePlayer();
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState('US');
  const [loginForm, setLoginForm] = useState({ email: '', password: '', name: '' });
  const [isSignup, setIsSignup] = useState(true);
  const [loading, setLoading] = useState(false);
  const [reservationRef, setReservationRef] = useState('');

  const effectiveStep = step === 1 ? 1 : !session?.user && step >= 2 ? 2 : step;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignup) {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginForm),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          toast.error(data?.error ?? 'Signup failed');
          setLoading(false);
          return;
        }
      }
      const result = await signIn('credentials', {
        email: loginForm.email,
        password: loginForm.password,
        redirect: false,
      });
      if (result?.ok) {
        setStep(3);
        toast.success('Signed in!');
      } else {
        toast.error('Invalid credentials');
      }
    } catch {
      toast.error('An error occurred');
    }
    setLoading(false);
  };

  const handleCompleteReservation = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        if (data?.checkoutUrl) {
          window.location.href = data.checkoutUrl;
          return;
        }
        setReservationRef(data?.referenceCode ?? 'JXN-PASS-0001');
        setStep(4);
        toast.success('Founding Player Pass locked in!');
      } else {
        toast.error(data?.error ?? 'Reservation failed');
      }
    } catch {
      toast.error('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-obsidian">
      <div className="max-w-[700px] mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-10">
          <p className="text-copper text-xs font-bold uppercase tracking-[0.3em] mb-3">
            SEASON 01 • FOUNDING PLAYER PASS
          </p>
          <h1
            className="hero-headline text-[clamp(2rem,5vw,3.25rem)] text-alabaster mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            RESERVE YOUR JUMPPACK 2.0
          </h1>
          <p className="text-sm text-titanium">
            Lock in your portable backpack ramp + full REAL2SEE slow-mo telemetry studio.
          </p>
        </div>

        {/* Refundable Guarantee Banner */}
        <div
          className="bg-emerald/10 border border-emerald/30 px-4 py-3 mb-8 text-sm text-emerald flex items-start gap-2.5"
          style={{ borderRadius: '12px' }}
        >
          <ShieldCheck size={18} className="flex-shrink-0 mt-0.5" />
          <div>
            <strong>100% Refundable Founding Pass</strong> — Your {price(150)} reservation deposit is protected and 1-click refundable at any time before your unit dispatches.
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 flex items-center justify-center text-xs font-bold ${
                  effectiveStep >= s
                    ? 'bg-copper text-white'
                    : 'bg-carbon text-titanium border border-white/10'
                }`}
                style={{ borderRadius: '12px' }}
              >
                {effectiveStep > s ? <Check size={14} /> : s}
              </div>
              {s < 4 && (
                <div className={`flex-1 h-px ${effectiveStep > s ? 'bg-copper' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Product */}
        {effectiveStep === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-carbon border border-white/10 p-6 mb-6" style={{ borderRadius: '16px' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-alabaster font-bold text-lg">JumpPack 2.0 + REAL2SEE App</h2>
                <span className="px-2.5 py-1 rounded-full bg-copper/20 text-copper font-mono text-xs font-bold">
                  BATCH 01
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-titanium text-sm">Shipping Region</span>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="bg-obsidian border border-white/15 px-3 py-2 text-sm text-alabaster focus:border-copper focus:outline-none"
                  style={{ borderRadius: '12px' }}
                >
                  <option value="US">United States (USD)</option>
                  <option value="CN">China (CNY / RMB)</option>
                  <option value="IE">Ireland / EU (EUR)</option>
                  <option value="UK">United Kingdom (GBP)</option>
                  <option value="AU">Australia (AUD)</option>
                  <option value="CA">Canada (CAD)</option>
                </select>
              </div>
              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-titanium">Founding Pass Deposit Today</span>
                  <span className="text-alabaster font-bold">{price(150)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-titanium">Balance Due Before Shipping</span>
                  <span className="text-alabaster">{price(499)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-white/10 pt-2">
                  <span className="text-titanium">Full System Total</span>
                  <span className="text-gold">{price(649)}</span>
                </div>
              </div>
              <p className="text-xs text-titanium mt-4 leading-relaxed">
                Includes JumpPack 2.0 3-panel folding composite ramp, LUOGO calibration target, Founding Rider badge, and instant access to the JumpXN Skill Tree.
              </p>
            </div>
            <button
              onClick={() => setStep(session?.user ? 3 : 2)}
              className="w-full bg-copper text-white py-4 text-sm font-bold uppercase tracking-wider hover:bg-copperHover transition-colors flex items-center justify-center gap-2"
              style={{ borderRadius: '12px' }}
            >
              CONTINUE TO PASS LOCK <ArrowRight size={16} />
            </button>
          </motion.div>
        )}

        {/* Step 2: Auth */}
        {effectiveStep === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-carbon border border-white/10 p-6 mb-6" style={{ borderRadius: '16px' }}>
              <h2 className="text-alabaster font-bold text-lg mb-4">
                {isSignup ? 'Create Your Player Locker' : 'Sign In To Your Player Locker'}
              </h2>
              <form onSubmit={handleAuth} className="flex flex-col gap-4">
                {isSignup && (
                  <input
                    type="text"
                    placeholder="Rider Name / Handle"
                    value={loginForm.name}
                    onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
                    className="bg-obsidian border border-white/15 px-4 py-3 text-sm text-alabaster placeholder-titanium/50 focus:border-copper focus:outline-none"
                    style={{ borderRadius: '12px' }}
                  />
                )}
                <input
                  type="email"
                  placeholder="Email Address"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="bg-obsidian border border-white/15 px-4 py-3 text-sm text-alabaster placeholder-titanium/50 focus:border-copper focus:outline-none"
                  style={{ borderRadius: '12px' }}
                  required
                />
                <input
                  type="password"
                  placeholder="Password (min 6 chars)"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="bg-obsidian border border-white/15 px-4 py-3 text-sm text-alabaster placeholder-titanium/50 focus:border-copper focus:outline-none"
                  style={{ borderRadius: '12px' }}
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-copper text-white py-3.5 text-sm font-bold uppercase tracking-wider hover:bg-copperHover transition-colors disabled:opacity-50"
                  style={{ borderRadius: '12px' }}
                >
                  {loading ? 'SAVING...' : isSignup ? 'CREATE LOCKER & CONTINUE' : 'SIGN IN & CONTINUE'}
                </button>
              </form>
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="mt-4 text-sm text-titanium hover:text-copper transition-colors"
              >
                {isSignup ? 'Already have a Player Locker? Sign in' : 'Need a Player Locker? Create one'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Confirm & Lock Founding Pass */}
        {effectiveStep === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-carbon border border-white/10 p-6 mb-6" style={{ borderRadius: '16px' }}>
              <h2 className="text-alabaster font-bold text-lg mb-4">Confirm Founding Player Pass</h2>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-titanium">JumpPack 2.0 + REAL2SEE Founding Pass</span>
                <span className="text-alabaster font-bold">{price(150)}</span>
              </div>
              <div className="flex justify-between text-xs text-emerald mb-6">
                <span>100% Refundable Deposit Guarantee</span>
                <span>✓ Included</span>
              </div>
              <button
                onClick={handleCompleteReservation}
                disabled={loading}
                className="w-full bg-copper text-white py-4 text-sm font-bold uppercase tracking-wider hover:bg-copperHover transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-copper/25"
                style={{ borderRadius: '12px' }}
              >
                <CreditCard size={16} />
                {loading ? 'LOCKING IN PASS...' : `LOCK IN FOUNDING PASS — ${price(150)}`}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Confirmation */}
        {effectiveStep === 4 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="bg-carbon border border-copper/30 p-8 text-center" style={{ borderRadius: '16px' }}>
              <div
                className="w-16 h-16 bg-copper flex items-center justify-center mx-auto mb-6"
                style={{ borderRadius: '12px' }}
              >
                <Sparkles size={32} className="text-white" />
              </div>
              <h2
                className="text-alabaster text-3xl font-bold mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                FOUNDING PASS CONFIRMED
              </h2>
              <p className="text-titanium text-sm mb-6">
                Welcome to Season 01. Your JumpPack 2.0 allocation and Skill Tree access are active.
              </p>
              <div
                className="bg-obsidian border border-white/10 px-6 py-4 mb-6 inline-block"
                style={{ borderRadius: '12px' }}
              >
                <p className="text-xs text-titanium mb-1">Founding Pass Reference</p>
                <p className="text-2xl font-bold text-copper font-mono flex items-center gap-2 justify-center">
                  {reservationRef}
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText?.(reservationRef);
                      toast.success('Copied!');
                    }}
                    className="text-titanium hover:text-copper"
                  >
                    <Copy size={16} />
                  </button>
                </p>
              </div>
              <div className="text-left max-w-md mx-auto">
                <h3 className="text-alabaster font-bold text-sm mb-3">What happens next:</h3>
                <div className="flex flex-col gap-3">
                  {[
                    'Founding Rider badge unlocked in your Player Locker',
                    'Full access to Jump Zone & REAL2SEE Slow-Mo Studio',
                    'Priority Batch 01 production & shipping updates',
                    'Balance payable only when your Pack 2.0 is ready to ship',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check size={14} className="text-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-titanium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/jump-zone"
                  className="bg-copper text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-copperHover transition-colors"
                  style={{ borderRadius: '12px' }}
                >
                  ENTER JUMP ZONE
                </Link>
                <Link
                  href="/dashboard"
                  className="border border-white/20 text-alabaster px-6 py-3 text-sm font-bold uppercase tracking-wider hover:border-copper hover:text-copper transition-colors"
                  style={{ borderRadius: '12px' }}
                >
                  OPEN PLAYER LOCKER
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
