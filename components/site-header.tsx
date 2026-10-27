'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CURRENCIES, usePlayer, type CurrencyCode } from '@/components/providers';

const NAV = [
  { href: '/#arenas', label: '01 / Pick Your Ride', cls: 'text-gold font-semibold' },
  { href: '/#hardware', label: '02 / Pack 2.0 Ramp', cls: '' },
  { href: '/#cheatcodes', label: '03 / 4 Pro Secrets', cls: 'text-copper font-semibold' },
  { href: '/#real2see', label: '04 / Slow-Mo Replay', cls: '' },
  { href: '/#powerups', label: '05 / Voice Coach', cls: 'text-sky font-semibold', ping: true },
  { href: '/#skilltree', label: '06 / Level Up', cls: '' },
  { href: '/jump-zone', label: 'Jump Zone', cls: '' },
];

export function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div
        className={`${
          small ? 'w-7 h-7 text-sm rounded' : 'w-9 h-9 text-xl rounded-lg'
        } bg-copper flex items-center justify-center font-display font-black tracking-tighter text-white shadow-lg shadow-copper/25 group-hover:scale-105 transition`}
      >
        JXN
      </div>
      {!small && (
        <div>
          <span className="font-display font-extrabold text-2xl tracking-tight text-white block leading-none">
            JUMPXN
          </span>
          <span className="font-mono text-[9px] tracking-[0.22em] text-titanium block mt-0.5">
            REAL-LIFE FLIGHT GAME
          </span>
        </div>
      )}
    </Link>
  );
}

export function SiteHeader() {
  const { data: session } = useSession() || {};
  const { currency, setCurrency, price, xp } = usePlayer();
  const [open, setOpen] = useState(false);
  const level = Math.floor(xp / 500) + 1;
  const handle = session?.user?.name || session?.user?.email?.split('@')[0];

  return (
    <>
      <div className="bg-carbon border-b border-white/10 text-[11px] tracking-widest uppercase font-mono text-titanium py-2 px-4 md:px-10 flex flex-wrap items-center justify-between gap-2 relative z-50">
        <div className="flex items-center gap-2.5">
          <span className="inline-block w-2 h-2 rounded-full bg-copper animate-pulse" />
          <span className="text-alabaster font-semibold">SEASON 01 // FOUNDING PLAYERS OPEN</span>
          <span className="hidden md:inline text-white/30">|</span>
          <span className="hidden md:inline">
            BMX • MTB • SKATEBOARD • SNOWBOARD • SCOOTER — LEARN TO FLY IN THE REAL WORLD!
          </span>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1.5">
            <span>PRICE IN:</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              className="bg-graphite text-alabaster border border-white/15 rounded px-2 py-0.5 text-[11px] focus:outline-none focus:border-copper cursor-pointer"
            >
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                <option key={c} value={c}>
                  {CURRENCIES[c].label}
                </option>
              ))}
            </select>
          </label>
          <Link
            href="/#giveaway"
            className="hidden sm:inline text-gold hover:text-white transition underline decoration-gold/40"
          >
            Win A Free Pack 2.0
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-40 glass-nav">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 h-20 flex items-center justify-between gap-4">
          <Logo />

          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-titanium">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`hover:text-white transition flex items-center gap-1.5 ${n.cls}`}
              >
                {n.ping && <span className="w-2 h-2 rounded-full bg-sky animate-ping" />}
                {n.label}
              </Link>
            ))}
            <Link href="/#giveaway" className="text-gold hover:text-white transition flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Win A Ramp
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex px-3.5 py-2 rounded-full bg-emerald/15 border border-emerald/40 text-emerald font-mono text-[11px] uppercase tracking-wider items-center gap-2">
              <span>
                ⚡ <strong>{xp.toLocaleString('en-US')}</strong> XP • LVL {String(level).padStart(2, '0')}
              </span>
            </div>
            <Link
              href={session?.user ? '/dashboard' : '/login'}
              className="hidden md:flex px-4 py-2.5 rounded-full glass-pill text-xs font-medium tracking-wider uppercase text-alabaster hover:border-white/40 transition items-center gap-2"
            >
              <span className={`w-2 h-2 rounded-full ${session?.user ? 'bg-emerald' : 'bg-titanium'}`} />
              <span className="max-w-[140px] truncate">{session?.user ? `@${handle}` : 'Player Login'}</span>
            </Link>
            <Link
              href="/reserve"
              className="px-5 py-2.5 rounded-full bg-copper hover:bg-copperHover text-white font-semibold text-xs uppercase tracking-widest transition shadow-lg shadow-copper/25 flex items-center gap-2"
            >
              <span>Get Pass</span>
              <span className="font-mono opacity-90">{price(150)}</span>
            </Link>
            <button
              className="xl:hidden p-2 text-alabaster"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="xl:hidden border-t border-white/10 bg-obsidian/95">
            <div className="max-w-[1440px] mx-auto px-5 py-4 flex flex-col font-mono text-xs uppercase tracking-wider">
              {[
                ...NAV,
                { href: '/#giveaway', label: 'Win A Pack 2.0', cls: 'text-gold' },
                { href: '/challenges', label: 'Challenges', cls: '' },
                { href: '/leaderboard', label: 'Leaderboard', cls: '' },
              ].map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`py-3 border-b border-white/5 text-titanium hover:text-white ${n.cls}`}
                >
                  {n.label}
                </Link>
              ))}
              {session?.user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="py-3 border-b border-white/5 text-alabaster"
                  >
                    Player Locker
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(false);
                      signOut({ redirectTo: '/' });
                    }}
                    className="py-3 text-left text-titanium uppercase"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setOpen(false)} className="py-3 text-alabaster">
                  Player Login
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
