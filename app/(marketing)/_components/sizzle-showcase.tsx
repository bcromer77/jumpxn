'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePlayer, type SportKey } from '@/components/providers';
import { IMG, Photo } from './bits';

const THREE_STEPS = [
  {
    num: '01',
    title: 'WEAR IT.',
    sub: 'Hands-free backpack straps. Ride your bike or board straight to the spot.',
    img: IMG.mtbForest,
    badge: 'FOLDED BACKPACK',
    tone: 'text-copper',
  },
  {
    num: '02',
    title: 'CLICK IT.',
    sub: 'Unfold in 15 seconds. 3 snap-locks, zero tools, 3 height levels.',
    img: IMG.pumpTrack,
    badge: '15-SECOND SETUP',
    tone: 'text-gold',
  },
  {
    num: '03',
    title: 'SEND IT.',
    sub: 'Prop your phone. Auto-cut 9:16 slow-mo clips for Douyin, TikTok & RedNote.',
    img: IMG.bmxRamp,
    badge: 'LOCKED FOR FLIGHT',
    tone: 'text-emerald',
  },
];

const TOY_SPORTS: Record<
  SportKey,
  { label: string; img: string; ruleTitle: string; ruleCue: string; air: string; boost: string }
> = {
  mtb: {
    label: '🚵 MTB',
    img: IMG.dirtMountains,
    ruleTitle: 'MTB SECRET: FINGERS OFF BRAKES 3 LENGTHS EARLY',
    ruleCue:
      'Let go of your brakes 3 bike-lengths before the ramp and push with your legs for +24% bigger air!',
    air: '0.89s AIR',
    boost: '1.42m HEIGHT',
  },
  bmx: {
    label: '🚲 BMX',
    img: IMG.bmxFlip,
    ruleTitle: 'BMX SECRET: LOOK OVER YOUR SHOULDER FOR 360s',
    ruleCue:
      'Where your eyes go, your bike follows! Turn your chin 68° over your shoulder to stomp the 360.',
    air: '0.84s AIR',
    boost: '360° LOCKED',
  },
  skate: {
    label: '🛹 SKATE',
    img: IMG.skateBowl,
    ruleTitle: 'SKATE SECRET: LEAN +16° FORWARD INTO THE RAMP',
    ruleCue:
      'Leaning your front shoulder +16° into the curve keeps the board glued to your shoes in mid-air!',
    air: '0.72s AIR',
    boost: '+16° SWEET SPOT',
  },
  snow: {
    label: '🏂 SNOW',
    img: IMG.snowAlpine,
    ruleTitle: 'SNOW SECRET: KEEP A 0° FLAT BOARD ON TAKE-OFF',
    ruleCue:
      'Ride up the kicker with the bottom of your snowboard 100% flat so you never catch an edge!',
    air: '0.92s AIR',
    boost: '0° FLAT BASE',
  },
  scoot: {
    label: '🛴 SCOOT',
    img: IMG.scooterPark,
    ruleTitle: 'SCOOTER SECRET: KEEP BARS STRAIGHT ON POP',
    ruleCue:
      'Jump tall with square bars first — giving you all the time you need to flick and catch your tailwhip!',
    air: '0.78s AIR',
    boost: 'CLEAN CATCH',
  },
};

export function SizzleShowcase() {
  const { sport, setSport, addXp, price } = usePlayer();
  const [scrub, setScrub] = useState(55);
  const [speaking, setSpeaking] = useState(false);

  const active = TOY_SPORTS[sport] || TOY_SPORTS.mtb;
  const pct = scrub / 100;
  const x = Math.round(280 + pct * 540);
  const y = Math.round(370 - Math.sin(pct * Math.PI) * 210 + pct * 80);

  const hearSecret = () => {
    setSpeaking(true);
    addXp(50, 'Tried Voice Coach Preview!');
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(active.ruleCue);
      u.rate = 1.05;
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(u);
    } else {
      setTimeout(() => setSpeaking(false), 3000);
    }
  };

  return (
    <>
      {/* BEAT 2: THE 3-WORD HARDWARE MAGIC TRICK (APPLE / DJI STYLE) */}
      <section className="py-20 max-w-[1440px] mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-copper block mb-2">
              THE 15-SECOND MAGIC TRICK
            </span>
            <h2 className="font-display font-black uppercase text-5xl sm:text-7xl text-white leading-none">
              WEAR IT. CLICK IT. SEND IT.
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-titanium">
            PHILIP MCINTOSH SMOOTH-LIFT GEOMETRY • ZERO TOOLS
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {THREE_STEPS.map((st) => (
            <div
              key={st.num}
              className="photo-card h-[440px] p-7 flex flex-col justify-between group border border-white/10 hover:border-copper/60 transition-all"
            >
              <Photo src={st.img} alt={st.title} className="bg-photo brightness-[0.74] contrast-[1.1]" />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/25 to-transparent" />
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-display font-black text-5xl text-white/90">{st.num}</span>
                <span className="glass-pill px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest text-gold">
                  {st.badge}
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="font-display font-black text-5xl uppercase text-white leading-none">
                  {st.title}
                </h3>
                <p className="text-sm text-alabaster/90 mt-2 max-w-sm leading-snug">{st.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BEAT 3: THE ONE-THUMB SLOW-MO FLIGHT TOY (RESN / NIKE STYLE) */}
      <section id="sizzle-toy" className="py-20 bg-carbon border-y border-white/10 scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-sky block mb-2">
                REAL-LIFE VIDEO GAME HUD • ONE-THUMB TASTE TEST
              </span>
              <h2 className="font-display font-black uppercase text-5xl sm:text-7xl text-white leading-none">
                DRAG YOUR THUMB TO FLY.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(TOY_SPORTS) as SportKey[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setSport(k, true)}
                  className={`px-4 py-2 rounded-full font-mono text-xs uppercase font-bold transition ${
                    sport === k ? 'bg-copper text-white' : 'glass-pill text-alabaster hover:border-white/40'
                  }`}
                >
                  {TOY_SPORTS[k].label}
                </button>
              ))}
            </div>
          </div>

          <div className="photo-card h-[480px] sm:h-[520px] p-6 sm:p-10 flex flex-col justify-between border border-sky/30">
            <Photo
              key={active.img}
              src={active.img}
              alt={active.label}
              className="brightness-[0.58] contrast-[1.15]"
            />

            {/* NEON FLIGHT ARC */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 1000 520"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="sizzleArc" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E8501E" />
                  <stop offset="50%" stopColor="#D4A359" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              <polygon points="120,440 280,440 280,370" fill="rgba(232,80,30,0.28)" stroke="#E8501E" strokeWidth="2.5" />
              <path
                d="M 280 370 Q 510 190 730 450"
                fill="none"
                stroke="#8F96A0"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                opacity="0.55"
              />
              <path d="M 280 370 Q 540 85 820 450" fill="none" stroke="url(#sizzleArc)" strokeWidth="5" />
              <g transform={`translate(${x}, ${y})`}>
                <circle cx="0" cy="0" r="14" fill="#D4A359" stroke="#060708" strokeWidth="3" />
                <rect x="-85" y="-52" width="170" height="28" rx="6" fill="#060708" stroke="#38BDF8" strokeWidth="1.5" />
                <text x="-72" y="-34" fill="#38BDF8" fontFamily="var(--font-mono)" fontWeight="700" fontSize="11">
                  {active.boost} • {active.air}
                </text>
              </g>
            </svg>

            <div className="relative z-20 flex flex-wrap items-center justify-between gap-3">
              <span className="px-4 py-1.5 rounded-full bg-obsidian/90 border border-gold/40 font-mono text-xs text-gold font-bold">
                ✦ {active.ruleTitle}
              </span>
              <button
                onClick={hearSecret}
                className="px-4 py-2 rounded-full bg-sky text-obsidian font-mono text-xs uppercase font-bold hover:opacity-90 transition shadow-lg"
              >
                {speaking ? '🔊 Coach Talking...' : '🔊 Hear 5-Second Voice Coach Tip'}
              </button>
            </div>

            <div className="relative z-20 glass-panel rounded-2xl p-5 mt-auto">
              <p className="text-sm sm:text-base text-white font-medium mb-3">{active.ruleCue}</p>
              <input
                type="range"
                min={0}
                max={100}
                value={scrub}
                onChange={(e) => setScrub(Number(e.target.value))}
                className="w-full cursor-pointer h-2.5"
                style={{ accentColor: '#E8501E' }}
                aria-label="Slow-motion flight scrubber"
              />
              <div className="flex justify-between text-[10px] font-mono text-titanium mt-1.5">
                <span>1. ROLL IN</span>
                <span className="text-copper">2. POP OFF PACK 2.0</span>
                <span className="text-gold">3. PEAK FLOAT IN THE SKY</span>
                <span className="text-emerald">4. STOMPED LANDING!</span>
              </div>
            </div>
          </div>

          {/* FAST CONVERSION BAR RIGHT AFTER THE SIZZLE */}
          <div className="mt-8 glass-panel rounded-2xl p-6 sm:p-8 border border-copper/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-copper block">
                DROP 01 • FOUNDING PLAYER PASS ({price(150)} REFUNDABLE DEPOSIT)
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl uppercase text-white mt-1">
                LOCK IN YOUR PACK 2.0 + FULL AI FLIGHT APP.
              </h3>
              <p className="text-xs text-titanium mt-1">
                Full System {price(649)} ({price(150)} today + {price(499)} when ready to ship). 100% refundable with 1 click anytime.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/reserve"
                className="px-7 py-4 rounded-full bg-copper hover:bg-copperHover text-white font-display font-bold text-lg uppercase tracking-wider transition shadow-xl shadow-copper/25"
              >
                CLAIM PASS — {price(150)} →
              </Link>
              <a
                href="#deep-dive"
                className="px-5 py-4 rounded-full glass-pill text-alabaster hover:text-white font-mono text-xs uppercase tracking-wider transition"
              >
                Explore Full Pro Lab Below ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSITION DIVIDER TO THE FULL ENGINEERING & INTERACTIVE LAB BELOW */}
      <div id="deep-dive" className="bg-obsidian pt-16 pb-4 text-center px-5 scroll-mt-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] uppercase tracking-widest text-gold">
          <span>⬇ FULL INTERACTIVE PRO LAB &amp; ENGINEERING SUITE BELOW ⬇</span>
        </div>
      </div>
    </>
  );
}
