'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePlayer, type SportKey } from '@/components/providers';
import { IMG, Modal, Photo } from './bits';

const SCENES: Record<SportKey, { label: string; img: string; tag: string }> = {
  mtb: { label: '🚵 Mountain Bike', img: IMG.dirtMountains, tag: 'ARENA: TRAIL MTB • GOLDEN HOUR DIRT' },
  bmx: { label: '🚲 BMX Street & Dirt', img: IMG.bmxSky, tag: 'ARENA: PRO BMX • DIRT & PARK SESSION' },
  skate: { label: '🛹 Skateboard Plaza', img: IMG.skateBowl, tag: 'ARENA: SKATEBOARD • CONCRETE BOWL' },
  snow: { label: '🏂 Snowboard Park', img: IMG.snowAlpine, tag: 'ARENA: SNOWBOARD • ALPINE & PARK KICKER' },
  scoot: { label: '🛴 Pro Scooter', img: IMG.scooterPark, tag: 'ARENA: PRO SCOOTER • SKATEPARK LINES' },
};

const SHOTS = [
  { btn: '00:00 BMX & MTB', time: '00:00 — 00:20 // BMX & MTB DIRT LAUNCH', head: 'THREE CLICKS. LOCKED FOR FLIGHT.', desc: 'Pack 2.0 unfolds in 15 seconds as BMX and MTB riders boost into golden-hour sunlight.', img: IMG.bmxSunset2 },
  { btn: '00:20 Skate & Scooter', time: '00:20 — 00:40 // SKATEBOARD & SCOOTER PLAZA', head: 'FLUSH ENTRY. EFFORTLESS POP.', desc: 'Skateboarders and scooter riders session a concrete plaza with the +16° sweet-spot overlay.', img: IMG.skateBowl },
  { btn: '00:40 Snowboard Send', time: '00:40 — 01:00 // SNOWBOARD ALPINE HORIZON', head: "DON'T JUST HIT THE LIP. OWN THE MOMENT.", desc: '240fps slow-motion snowboard method grab into sunset powder.', img: IMG.snowAlpine },
];

const STRIP = [
  { k: '01 // THE PORTAL ON YOUR BACK', c: 'text-copper', t: 'Turn Any Spot Into Your Arena', d: 'Hike or ride in hands-free. Unclip 3 latches and turn a flat driveway, park, or trail into a launchpad in 15 seconds.' },
  { k: '02 // TEACH YOURSELF TO FLY', c: 'text-gold', t: 'We Teach You How To Catch Air', d: "A ramp alone doesn't land tricks. Interactive body-position sliders & pro coaches show you exactly where to lean and when to let go of the brakes." },
  { k: '03 // REAL-LIFE VIDEO GAME HUD', c: 'text-sky', t: 'Instant Slow-Mo & Voice Co-Pilot', d: 'Prop up your phone. JumpXN auto-clips your sends, tracks your arc in 240fps, and talks you through your next attempt hands-free.' },
  { k: '04 // LEVEL UP WITH YOUR CREW', c: 'text-emerald', t: 'Earn XP & Drop 9:16 Highlights', d: 'Compare your arc side-by-side against World Champions, climb verified global rankings, and share instant split-screen clips.' },
];

export function Hero() {
  const { price, sport, setSport } = usePlayer();
  const [film, setFilm] = useState(false);
  const [shot, setShot] = useState(0);
  const s = SCENES[sport] || SCENES.mtb;
  const f = SHOTS[shot];

  return (
    <>
      <section id="top" className="relative w-full min-h-[92vh] flex items-end pb-14 md:pb-20 pt-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Photo key={s.img} src={s.img} alt={`${s.label} rider in the air`} priority className="scale-105 contrast-[1.08] brightness-[0.86] animate-fade-in" />
          <div className="absolute inset-0 cinematic-vignette" />
        </div>

        <div className="hidden md:flex absolute top-8 right-10 z-10 items-center gap-4 glass-pill px-4 py-2 rounded-full text-[11px] font-mono text-alabaster/90">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-copper" />240FPS REPLAY ENGINE</span>
          <span className="text-white/25">|</span>
          <span>{s.tag}</span>
          <span className="text-white/25">|</span>
          <span className="text-gold">ENDORPHIN LEVEL: MAXIMUM</span>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono uppercase tracking-widest text-gold">
              <span>BMX • MTB • SKATEBOARD • SNOWBOARD • SCOOTER</span>
            </div>
            <h1 className="font-display font-black uppercase text-6xl sm:text-7xl xl:text-[90px] leading-[0.88] tracking-tight text-white drop-shadow-2xl">
              TRADE YOUR GAMING CHAIR<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-alabaster to-gold">FOR REAL FLIGHT.</span>
            </h1>
            <p className="text-lg sm:text-xl text-alabaster/90 max-w-2xl font-light leading-relaxed">
              Pixels don&apos;t give you adrenaline. Whether you ride <strong className="text-white font-medium">BMX, Mountain Bike, Skateboard, Snowboard, or Scooter</strong>, we don&apos;t just hand you a ramp — we give you the cheat codes to gravity. Unfold <strong className="text-white font-medium">Pack 2.0</strong> anywhere, unlock World Champion coaching, and level up in the real world.
            </p>
            <div className="pt-2">
              <p className="font-mono text-[11px] uppercase tracking-widest text-titanium mb-2.5">Tap A Sport To Transform The Arena:</p>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(SCENES) as SportKey[]).map((k) => (
                  <button
                    key={k}
                    onClick={() => setSport(k, true)}
                    className={`px-4 py-2.5 rounded-full text-xs font-semibold transition ${k === sport ? 'bg-white text-obsidian' : 'glass-pill text-alabaster hover:border-white/40'}`}
                  >
                    {SCENES[k].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4 mb-5">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-copper block">DROP 01 • FOUNDING PLAYER PASS</span>
                  <h2 className="font-display font-bold text-2xl uppercase tracking-wide text-white mt-0.5">DON&apos;T JUST WATCH PROS. BECOME ONE.</h2>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald/15 text-emerald font-mono text-[10px] uppercase whitespace-nowrap font-semibold">100% Refundable</span>
              </div>
              <p className="text-sm text-titanium leading-relaxed mb-6">
                Lock in your <strong className="text-white font-medium">Pack 2.0</strong> with a {price(150)} refundable reservation and get instant day-one access to the <strong className="text-white font-medium">JumpXN Multi-Sport Skill Tree</strong>, pro trick breakdowns, and Founding Player badge.
              </p>
              <div className="grid grid-cols-3 gap-3 bg-obsidian/70 border border-white/10 rounded-xl p-4 mb-6">
                <div>
                  <span className="font-mono text-[10px] uppercase text-titanium block">Full System</span>
                  <span className="font-display font-bold text-2xl text-white">{price(649)}</span>
                  <span className="block text-[10px] text-titanium">Pack 2.0 + App</span>
                </div>
                <div className="border-x border-white/10 px-3">
                  <span className="font-mono text-[10px] uppercase text-copper block">Reserve Today</span>
                  <span className="font-display font-bold text-2xl text-copper">{price(150)}</span>
                  <span className="block text-[10px] text-alabaster/80">1-Click Refundable</span>
                </div>
                <div className="pl-1">
                  <span className="font-mono text-[10px] uppercase text-titanium block">When Ready</span>
                  <span className="font-display font-bold text-2xl text-white">{price(499)}</span>
                  <span className="block text-[10px] text-titanium">Before Shipping</span>
                </div>
              </div>
              <div className="space-y-3">
                <Link href="/reserve" className="w-full py-4 px-6 rounded-xl bg-copper hover:bg-copperHover text-white font-semibold text-sm uppercase tracking-widest transition flex items-center justify-between gap-3 shadow-xl shadow-copper/20 group">
                  <span>CLAIM FOUNDING PASS — {price(150)}</span>
                  <span className="hidden sm:inline font-mono text-xs group-hover:translate-x-1 transition-transform">UNLOCK SKILL TREE →</span>
                </Link>
                <button onClick={() => setFilm(true)} className="w-full py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-alabaster font-medium text-xs uppercase tracking-widest transition flex items-center justify-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white text-obsidian flex items-center justify-center text-[10px] font-bold">▶</span>
                  <span>WATCH THE 60-SECOND LAUNCH TRAILER</span>
                </button>
              </div>
              <div className="mt-5 pt-4 border-t border-white/10 flex items-start gap-2.5 text-[11px] text-titanium leading-normal">
                <span className="text-emerald font-bold mt-0.5">✓</span>
                <p><strong className="text-alabaster">Zero-Risk Player Guarantee:</strong> Change your mind? Cancel anytime with one click in your Player Locker for a 100% full refund of your {price(150)} deposit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-carbon py-10">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STRIP.map((x) => (
            <div key={x.k}>
              <span className={`font-mono text-[10px] uppercase tracking-widest block ${x.c}`}>{x.k}</span>
              <p className="font-display font-bold text-2xl uppercase text-white mt-1">{x.t}</p>
              <p className="text-xs text-titanium mt-1 leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <Modal open={film} onClose={() => setFilm(false)} wide>
        <span className="font-mono text-[10px] uppercase tracking-widest text-gold block mb-3">60-SECOND LAUNCH TRAILER • MULTI-SPORT CUT</span>
        <div className="flex flex-wrap gap-2 mb-4 pr-10">
          {SHOTS.map((x, i) => (
            <button key={x.btn} onClick={() => setShot(i)} className={`px-3 py-1 rounded text-[11px] font-mono ${i === shot ? 'bg-copper text-white' : 'bg-white/10 text-titanium hover:text-white'}`}>
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
