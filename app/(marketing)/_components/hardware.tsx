'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePlayer } from '@/components/providers';
import { IMG, Photo } from './bits';

const STAGES = [
  {
    btn: '01. Wear It',
    badge: 'STEP 01 // WEAR IT LIKE A BACKPACK',
    title: '01. RIDE TO THE SPOT HANDS-FREE',
    desc: 'Folds flat with comfy backpack straps so you can ride your bike, skateboard, or scooter straight to the park with your friends.',
    img: IMG.mtbForest,
  },
  {
    btn: '02. Unfold It',
    badge: 'STEP 02 // 15-SECOND SETUP',
    title: '02. THREE CLICKS. NO TOOLS NEEDED.',
    desc: 'Unclip the latches, open the ramp, and click the legs into Level 1 (Starter), Level 2 (Medium), or Level 3 (Big Air).',
    img: IMG.pumpTrack,
  },
  {
    btn: '03. Fly!',
    badge: 'STEP 03 // LOCK & LAUNCH',
    title: '03. SET IT DOWN & SEND IT!',
    desc: 'Super-grippy rubber feet hold tight on grass, dirt, driveways, or skatepark concrete so the ramp stays rock-solid.',
    img: IMG.bmxRamp,
  },
];

const HOTSPOTS = [
  {
    t: 'Smooth-Lift Curve (No Scary Kick)',
    b: 'border-l-copper',
    dot: 'bg-copper hotspot-ring',
    d: 'Shaped so your wheels roll up smoothly and lift you into the air without ever kicking your back wheel.',
  },
  {
    t: '15-Second Snap Locks',
    b: 'border-l-gold',
    dot: 'bg-gold',
    d: 'Zero tools, zero loose screws. Just unfold, hear the legs click into place, and start jumping.',
  },
  {
    t: '3 Height Levels As You Level Up',
    b: 'border-l-emerald',
    dot: 'bg-emerald',
    d: 'Start low on Level 1 for your very first jumps, then raise it to Level 2 and Level 3 as you get bigger air!',
  },
];

const LOADOUT: [string, string, string][] = [
  ['Your Ramp', 'Pack 2.0 Backpack Launch Ramp', 'text-white font-medium'],
  ['How You Carry It', 'Built-In Padded Backpack Straps', 'text-white font-medium'],
  ['Setup Time', '15 Seconds (3 Clicks, No Tools)', 'text-emerald font-mono'],
  ['3 Height Settings', 'Level 1 (Easy) → Level 3 (Pro Air)', 'font-mono text-gold'],
  ['Works With', 'BMX • MTB • Skateboard • Scooter', 'text-white font-medium'],
  ['App Included', 'JumpXN Slow-Mo Studio + Pro Lessons', 'text-sky font-medium'],
  ['Smart Jump Slot', 'Ready for Jump Counter Pod', 'font-mono text-alabaster/80'],
];

export function Hardware() {
  const { price } = usePlayer();
  const [stage, setStage] = useState(2);
  const s = STAGES[stage];

  return (
    <section id="hardware" className="py-24 max-w-[1440px] mx-auto px-5 md:px-10 scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-copper block mb-2">
            02 // THE RAMP ON YOUR BACK
          </span>
          <h2 className="font-display font-black uppercase text-5xl sm:text-6xl text-white leading-none">
            BACKPACK TO LAUNCHPAD IN 15 SECONDS.
          </h2>
        </div>
        <p className="max-w-md text-sm text-titanium leading-relaxed">
          Created by pro ramp designer Philip McIntosh. Pack 2.0 is built so the curve feels super smooth under your wheels — lifting you into the air naturally without any scary bumps.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8 photo-card min-h-[540px] flex flex-col justify-between p-6 sm:p-10">
          <Photo key={s.img} src={s.img} alt={s.title} className="bg-photo brightness-[0.82] contrast-[1.08]" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
            <span className="glass-pill px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider text-alabaster">
              PACK 2.0 • SMOOTH-LIFT DESIGN BY PHILIP MCINTOSH
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-copper text-white font-mono text-[11px] uppercase font-semibold">
              {s.badge}
            </span>
          </div>

          <div className="relative z-10 my-auto grid grid-cols-1 sm:grid-cols-3 gap-4 pt-16">
            {HOTSPOTS.map((h) => (
              <div key={h.t} className={`glass-panel p-4 rounded-xl border-l-2 ${h.b}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2.5 h-2.5 rounded-full relative shrink-0 ${h.dot}`} />
                  <span className="font-mono text-[11px] uppercase text-white font-semibold">{h.t}</span>
                </div>
                <p className="text-xs text-titanium">{h.d}</p>
              </div>
            ))}
          </div>

          <div className="relative z-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-3xl uppercase text-white">{s.title}</h3>
              <p className="text-sm text-alabaster/80">{s.desc}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {STAGES.map((x, i) => (
                <button
                  key={x.btn}
                  onClick={() => setStage(i)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono uppercase transition ${
                    i === stage ? 'bg-copper text-white font-semibold' : 'glass-pill text-alabaster hover:border-white/50'
                  }`}
                >
                  {x.btn}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <span className="font-mono text-xs uppercase tracking-widest text-gold">WHAT YOU GET IN THE BOX</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/10 text-alabaster">FOUNDING EDITION</span>
            </div>
            <div className="divide-y divide-white/10 text-xs">
              {LOADOUT.map(([k, v, c]) => (
                <div key={k} className="py-3.5 flex justify-between gap-4">
                  <span className="text-titanium">{k}</span>
                  <span className={`text-right ${c}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
            <div className="p-3.5 rounded-xl bg-obsidian/80 border border-white/10 text-[11px] text-titanium">
              <strong className="text-white">Safety First, Big Air Second:</strong> Always wear your helmet and pads, and set up on flat ground with plenty of room to land!
            </div>
            <Link
              href="/reserve"
              className="block text-center w-full py-3.5 rounded-xl bg-white text-obsidian hover:bg-alabaster font-semibold text-xs uppercase tracking-widest transition"
            >
              Reserve Your Pack 2.0 — {price(150)} Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
