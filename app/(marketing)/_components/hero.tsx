'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePlayer, type SportKey } from '@/components/providers';
import { IMG, Modal, Photo } from './bits';

const SCENES: Record<SportKey, { label: string; img: string; secret: string; air: string }> = {
  mtb: {
    label: '🚵 MTB',
    img: IMG.dirtMountains,
    secret: 'PRO SECRET: FINGERS OFF BRAKES 3 LENGTHS EARLY',
    air: '0.89s AIR • LEVEL 3 SEND',
  },
  bmx: {
    label: '🚲 BMX',
    img: IMG.bmxSky,
    secret: 'PRO SECRET: TURN YOUR CHIN TO LOCK IN THE 360°',
    air: '0.84s AIR • FULL 360° SPIN',
  },
  skate: {
    label: '🛹 SKATE',
    img: IMG.skateBowl,
    secret: 'PRO SECRET: LEAN +16° FORWARD INTO THE RAMP',
    air: '0.72s AIR • INDY GRAB',
  },
  snow: {
    label: '🏂 SNOW',
    img: IMG.snowAlpine,
    secret: 'PRO SECRET: RIDE UP ON A 0° FLAT BOARD',
    air: '0.92s AIR • METHOD GRAB',
  },
  scoot: {
    label: '🛴 SCOOT',
    img: IMG.scooterPark,
    secret: 'PRO SECRET: KEEP BARS SQUARE ON TAKE-OFF',
    air: '0.78s AIR • TAILWHIP CATCH',
  },
};

const SHOTS = [
  {
    btn: '01. Wear It',
    time: '00:00 — 00:05 // THE WALK-IN',
    head: 'ONE BACKPACK. ANY SPOT.',
    desc: 'Ride your bike, skateboard, or scooter hands-free to the park with Pack 2.0 on your back.',
    img: IMG.bmxSunset2,
  },
  {
    btn: '02. Click It (15s)',
    time: '00:05 — 00:10 // 3 CLICKS. ZERO TOOLS.',
    head: 'UNFOLD. CLICK. LOCKED.',
    desc: 'Pop the latches and click the legs into Level 1, 2, or 3 in 15 seconds flat.',
    img: IMG.skateWheel,
  },
  {
    btn: '03. Fly In Slow-Mo',
    time: '00:10 — 00:15 // 240FPS FLIGHT',
    head: 'PROP YOUR PHONE. OWN THE SKY.',
    desc: 'JumpXN auto-clips your jump in super slow-motion, draws your neon flight arc, and coaches you through your earbuds.',
    img: IMG.bmxSky,
  },
];

export function Hero() {
  const { price, sport, setSport } = usePlayer();
  const [film, setFilm] = useState(false);
  const [shot, setShot] = useState(2);
  const [lvl, setLvl] = useState<1 | 2 | 3>(3);
  const s = SCENES[sport] || SCENES.mtb;
  const f = SHOTS[shot];

  return (
    <>
      <section id="top" className="relative w-full min-h-[94vh] flex flex-col justify-between pb-10 pt-24 overflow-hidden">
        {/* FULL-BLEED POSTER BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <Photo
            key={s.img}
            src={s.img}
            alt={`${s.label} rider flying`}
            priority
            className="scale-105 contrast-[1.12] brightness-[0.78] animate-fade-in"
          />
          <div className="absolute inset-0 cinematic-vignette" />
        </div>

        {/* TOP MINIMAL TELEMETRY PILL */}
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-5 md:px-10 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill text-[11px] font-mono uppercase tracking-widest text-gold">
            <span className="w-2 h-2 rounded-full bg-copper animate-ping" />
            <span>JUMPPACK 2.0 PORTABLE RAMP • PHILIP MCINTOSH SIGNATURE</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 glass-pill px-4 py-1.5 rounded-full text-[11px] font-mono text-alabaster">
            <span className="text-emerald font-bold">{s.air}</span>
            <span className="text-white/25">|</span>
            <span className="text-sky">{s.secret}</span>
          </div>
        </div>

        {/* MAIN HERO GRID: LEFT SIZZLE HEADLINE + RIGHT PACK 2.0 INTERACTIVE HARDWARE SPOTLIGHT */}
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-5 md:px-10 my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h1 className="font-display font-black uppercase text-6xl sm:text-7xl xl:text-[102px] leading-[0.86] tracking-tight text-white drop-shadow-2xl">
              BACKPACK TO FLIGHT<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gold to-copper">
                IN 15 SECONDS.
              </span>
            </h1>
            <p className="mt-5 text-base sm:text-xl text-alabaster/95 max-w-xl font-light leading-snug drop-shadow">
              Unclip <strong className="text-white font-semibold">Pack 2.0</strong> anywhere in 3 clicks — zero tools needed. Prop up your phone, launch into <strong className="text-gold font-semibold">240fps neon slow-mo</strong>, and let your AI earbud coach guide you to effortless air.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <Link
                href="/reserve"
                className="py-4 px-7 rounded-full bg-copper hover:bg-copperHover text-white font-display font-bold text-xl uppercase tracking-wider transition flex items-center gap-3 shadow-2xl shadow-copper/40 hover:scale-105"
              >
                <span>GET FOUNDING PASS — {price(150)}</span>
                <span className="font-mono text-[10px] bg-obsidian/30 px-2.5 py-1 rounded-full">100% REFUNDABLE</span>
              </Link>
              <button
                onClick={() => setFilm(true)}
                className="py-4 px-6 rounded-full glass-pill hover:border-white/50 text-white font-mono text-xs uppercase tracking-widest transition flex items-center gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-white text-obsidian flex items-center justify-center text-[10px] font-bold">
                  ▶
                </span>
                <span>WATCH 15s UNFOLD</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: JUMPPACK 2.0 INTERACTIVE HARDWARE SPOTLIGHT CARD */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-5 sm:p-6 border-2 border-copper/50 shadow-2xl">
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-white/10">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-copper block">
                  HARDWARE SPOTLIGHT // NEXT-GEN JUMPPACK 2.0
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase text-white leading-none mt-0.5">
                  3-PANEL FOLDING LAUNCH RAMP
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald/15 border border-emerald/40 font-mono text-[10px] text-emerald font-bold shrink-0">
                ✓ 15s SNAP-LOCK
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-4">
              {/* 01. BACKPACK MODE */}
              <div className="sm:col-span-5 bg-obsidian/90 rounded-2xl p-3.5 border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[9px] uppercase text-gold block">01. BACKPACK MODE</span>
                  <h3 className="font-display font-bold text-lg uppercase text-white">WEAR IT HANDS-FREE</h3>
                </div>
                <svg className="w-full h-36 my-1" viewBox="0 0 180 150">
                  {/* Padded Shoulder Straps */}
                  <path d="M 48 25 C 18 40, 18 110, 48 125" fill="none" stroke="#8F96A0" strokeWidth="7" strokeLinecap="round" />
                  <path d="M 132 25 C 162 40, 162 110, 132 125" fill="none" stroke="#8F96A0" strokeWidth="7" strokeLinecap="round" />
                  {/* 3-Panel Folded Composite Body */}
                  <rect x="46" y="14" width="88" height="122" rx="10" fill="#20242C" stroke="#D4A359" strokeWidth="2.5" />
                  <line x1="50" y1="54" x2="130" y2="54" stroke="#060708" strokeWidth="3" />
                  <line x1="50" y1="94" x2="130" y2="94" stroke="#060708" strokeWidth="3" />
                  {/* 6 Copper Snap-Lock Latches */}
                  {[30, 72, 110].map((ly) => (
                    <g key={ly}>
                      <rect x="40" y={ly} width="9" height="12" rx="2" fill="#E8501E" />
                      <rect x="131" y={ly} width="9" height="12" rx="2" fill="#E8501E" />
                    </g>
                  ))}
                  <rect x="63" y="63" width="54" height="22" rx="4" fill="#E8501E" />
                  <text x="69" y="78" fill="#FFFFFF" fontFamily="var(--font-display)" fontWeight="800" fontSize="13">
                    PACK 2.0
                  </text>
                </svg>
                <p className="font-mono text-[10px] text-titanium leading-tight">
                  • Padded Shoulder Straps<br />• Ride Bike Or Board To Spot
                </p>
              </div>

              {/* 02. DEPLOYED FLIGHT MODE (INTERACTIVE 3-HEIGHT SWITCHER) */}
              <div className="sm:col-span-7 bg-obsidian/90 rounded-2xl p-3.5 border border-copper/40 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-1">
                  <div>
                    <span className="font-mono text-[9px] uppercase text-copper block">02. DEPLOYED MODE (15 SEC)</span>
                    <h3 className="font-display font-bold text-lg uppercase text-white">ANTI-BUCK CURVE • 3 HEIGHTS</h3>
                  </div>
                  <div className="flex gap-1">
                    {([1, 2, 3] as const).map((h) => (
                      <button
                        key={h}
                        onClick={() => setLvl(h)}
                        className={`px-2 py-0.5 rounded font-mono text-[9px] uppercase ${
                          lvl === h ? 'bg-copper text-white font-bold' : 'bg-white/10 text-titanium hover:text-white'
                        }`}
                      >
                        L{h}
                      </button>
                    ))}
                  </div>
                </div>

                <svg className="w-full h-36 my-1" viewBox="0 0 260 150">
                  <line x1="10" y1="132" x2="250" y2="132" stroke="rgba(244,243,239,0.25)" strokeWidth="1.5" strokeDasharray="5 4" />
                  {/* Ghosted 3 Height Curves */}
                  <path d="M 20 132 Q 125 126 205 68" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" opacity={lvl === 1 ? 1 : 0.45} />
                  <text x="210" y="72" fill="#10B981" fontFamily="var(--font-mono)" fontSize="8">LVL 1</text>

                  <path d="M 20 132 Q 125 124 205 46" fill="none" stroke="#D4A359" strokeWidth="2" strokeDasharray="3 3" opacity={lvl === 2 ? 1 : 0.45} />
                  <text x="210" y="50" fill="#D4A359" fontFamily="var(--font-mono)" fontSize="8">LVL 2</text>

                  {/* Active Deployed 3-Panel Ramp Curve */}
                  {(() => {
                    const lipY = lvl === 3 ? 22 : lvl === 2 ? 46 : 68;
                    const midY = lvl === 3 ? 88 : lvl === 2 ? 98 : 108;
                    return (
                      <g>
                        <path
                          d={`M 20 132 Q 125 122 205 ${lipY} L 205 ${lipY + 12} Q 125 130 20 132 Z`}
                          fill="#282D37"
                          stroke="#E8501E"
                          strokeWidth="2.5"
                        />
                        {/* Telescopic Rear Snap-Lock Struts */}
                        <line x1="200" y1={lipY + 10} x2="192" y2="132" stroke="#D4A359" strokeWidth="4" />
                        <line x1="135" y1={midY} x2="192" y2="132" stroke="#8F96A0" strokeWidth="3" />
                        <line x1="135" y1={midY} x2="112" y2="132" stroke="#8F96A0" strokeWidth="3" />
                        {/* 3 Hinged Panel Seams */}
                        <circle cx="82" cy="122" r="3" fill="#D4A359" />
                        <circle cx="145" cy={midY - 6} r="3" fill="#D4A359" />
                        {/* Non-Slip Rubber Pads */}
                        <rect x="14" y="129" width="14" height="5" rx="2" fill="#10B981" />
                        <rect x="105" y="129" width="14" height="5" rx="2" fill="#10B981" />
                        <rect x="185" y="129" width="14" height="5" rx="2" fill="#10B981" />
                        {/* Smart Sensor Pod Slot */}
                        <rect x="118" y={midY + 2} width="24" height="8" rx="2" fill="#38BDF8" />
                      </g>
                    );
                  })()}
                  <text x="210" y="26" fill="#E8501E" fontFamily="var(--font-mono)" fontWeight="700" fontSize="8">LVL 3</text>
                  <text x="22" y="112" fill="#F4F3EF" fontFamily="var(--font-mono)" fontSize="7.5">FLUSH SKATE ENTRY</text>
                  <text x="95" y="144" fill="#38BDF8" fontFamily="var(--font-mono)" fontSize="7.5">AI SENSOR POD BAY</text>
                </svg>

                <p className="font-mono text-[10px] text-alabaster/90 leading-tight">
                  Tap <strong className="text-copper">L1 / L2 / L3</strong> above to preview the 3 tool-free height settings!
                </p>
              </div>
            </div>

            {/* 4 QUICK HARDWARE SPECS */}
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                ['SETUP', '15s (No Tools)', 'text-emerald'],
                ['3 HEIGHTS', 'Lvl 1 / 2 / 3', 'text-gold'],
                ['SURFACE', 'All-Weather Grip', 'text-white'],
                ['BUILT FOR', 'Bike•Skate•Scoot', 'text-sky'],
              ].map(([k, v, c]) => (
                <div key={k} className="bg-obsidian/80 border border-white/10 rounded-xl p-2">
                  <span className="font-mono text-[8px] text-titanium block">{k}</span>
                  <span className={`font-display font-bold text-sm ${c}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR: 5-SPORT INSTANT SWITCHER + 3 SIZZLE STATS */}
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-5 md:px-10 pt-5 border-t border-white/15 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-titanium mr-2">
              TAP YOUR RIDE:
            </span>
            {(Object.keys(SCENES) as SportKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setSport(k, true)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase font-bold transition ${
                  k === sport
                    ? 'bg-white text-obsidian shadow-lg scale-105'
                    : 'glass-pill text-alabaster hover:border-white/40'
                }`}
              >
                {SCENES[k].label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 sm:gap-10 font-mono">
            <div>
              <span className="text-2xl sm:text-3xl font-display font-black text-white block leading-none">
                15 SEC
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gold">3-CLICK UNFOLD</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-display font-black text-white block leading-none">
                5 SPORTS
              </span>
              <span className="text-[10px] uppercase tracking-widest text-emerald">1 BACKPACK RAMP</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-display font-black text-white block leading-none">
                240 FPS
              </span>
              <span className="text-[10px] uppercase tracking-widest text-sky">AI VOICE COACH</span>
            </div>
          </div>
        </div>
      </section>

      <Modal open={film} onClose={() => setFilm(false)} wide>
        <span className="font-mono text-[10px] uppercase tracking-widest text-gold block mb-3">
          15-SECOND SIZZLE REEL • WEAR IT → CLICK IT → FLY
        </span>
        <div className="flex flex-wrap gap-2 mb-4 pr-10">
          {SHOTS.map((x, i) => (
            <button
              key={x.btn}
              onClick={() => setShot(i)}
              className={`px-3 py-1 rounded text-[11px] font-mono ${
                i === shot ? 'bg-copper text-white' : 'bg-white/10 text-titanium hover:text-white'
              }`}
            >
              {x.btn}
            </button>
          ))}
        </div>
        <div className="photo-card h-80 relative p-6 flex flex-col justify-end">
          <Photo key={f.img} src={f.img} alt={f.head} className="brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
          <div className="relative z-10">
            <span className="font-mono text-xs text-gold">{f.time}</span>
            <h4 className="font-display font-black text-4xl uppercase text-white">{f.head}</h4>
            <p className="text-xs text-alabaster/90 mt-1">{f.desc}</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
