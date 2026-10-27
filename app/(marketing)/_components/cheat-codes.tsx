'use client';
import { useState } from 'react';
import { IMG, Photo } from './bits';

const EMERALD = '#10B981';
const COPPER = '#E8501E';
const GOLD = '#D4A359';

function skateState(deg: number) {
  if (deg >= 12 && deg <= 20)
    return {
      color: EMERALD,
      cls: 'emerald',
      pill: `✓ PERFECT LEAN (+${deg}° SWEET SPOT)`,
      label: `+${deg}° Forward (Sweet Spot!)`,
      ratio: '50% FRONT FOOT / 50% BACK FOOT',
      cue: '✓ Awesome! Leaning your front shoulder into the ramp keeps the skateboard glued to your shoes all the way into the air!',
    };
  if (deg < 12)
    return {
      color: COPPER,
      cls: 'copper',
      pill: `⚠ LEANING BACK (${deg}°) — BOARD SLIPS OUT!`,
      label: `${deg}° Too Far Back`,
      ratio: 'TOO MUCH WEIGHT ON BACK TAIL',
      cue: '⚠ Watch out! Standing straight up on a curved ramp pushes the skateboard out in front of you. Bring your front shoulder forward over the nose!',
    };
  return {
    color: GOLD,
    cls: 'gold',
    pill: `⚡ TOO FAR FORWARD (+${deg}°)`,
    label: `+${deg}° Leaning Too Much`,
    ratio: 'TOO HEAVY ON FRONT WHEELS',
    cue: '⚡ Almost! Leaning too far over the nose makes it hard to pop. Bring your shoulders back slightly into the green sweet spot.',
  };
}

function brakeState(val: number) {
  const meters = val / 10;
  const bl = (val / 15).toFixed(1);
  if (meters >= 4.5)
    return {
      cls: 'emerald',
      color: EMERALD,
      pill: '✓ FINGER OFF BRAKE (FULL BOOST!)',
      dist: `${bl} Bike-Lengths Early (Perfect!)`,
      lever: 0,
      finger: [152, 50],
      fingerTxt: 'HOLDING GRIP TIGHT',
      fork: 'SMOOTH & READY TO FLY',
      pop: 'JUMP BOOST: 100% POWER!',
      rotor: 'WHEELS SPINNING FREE & FAST',
      cue: `✓ Nailed it! You took your finger off the brake ${bl} bike-lengths before the ramp and held the grip with all 5 fingers for a super smooth launch!`,
    };
  if (meters >= 2)
    return {
      cls: 'gold',
      color: GOLD,
      pill: '⚡ LET GO A LITTLE EARLIER',
      dist: `${bl} Bike-Lengths (A Bit Late)`,
      lever: -8,
      finger: [132, 64],
      fingerTxt: 'FINGER ON BRAKE',
      fork: 'FRONT WHEEL SQUISHED',
      pop: 'JUMP BOOST: MEDIUM',
      rotor: 'BRAKES SLOWING YOU DOWN',
      cue: `⚡ So close! Letting go at ${bl} bike-lengths means your front wheel is still squished down when you hit the ramp. Let go a little earlier!`,
    };
  return {
    cls: 'copper',
    color: COPPER,
    pill: '⚠ BRAKING ON RAMP — NOSE DIVE!',
    dist: 'Pulling Brakes On The Ramp!',
    lever: -18,
    finger: [122, 72],
    fingerTxt: 'PULLING BRAKE!',
    fork: 'FRONT WHEEL DIVING DOWN!',
    pop: 'JUMP BOOST: TOO LOW',
    rotor: 'BRAKES LOCKED ON RAMP',
    cue: '⚠ Never pull your brakes on the ramp! It makes your front wheel dive down. Set your speed early, then take your finger off the brake before the green line!',
  };
}

function bmxState(deg: number) {
  if (deg >= 52)
    return {
      cls: 'emerald',
      color: EMERALD,
      pill: '✓ FULL 360 SPIN UNLOCKED!',
      label: `${deg}° Looking Over Shoulder (Full 360!)`,
      readout: 'FULL 360° LANDED CLEAN!',
      cue: '✓ Boom! Where your eyes look, your bike follows! Turning your chin over your shoulder pulls your bike all the way around to a clean landing.',
    };
  if (deg >= 25)
    return {
      cls: 'gold',
      color: GOLD,
      pill: '⚡ STOPPED AT 270° (KEEP LOOKING!)',
      label: `${deg}° Half Turn (Stops Early)`,
      readout: 'SPIN STOPPED AT 270°',
      cue: '⚡ Almost! You started spinning, but your eyes looked down at the ground in mid-air. Keep turning your chin to finish the 360!',
    };
  return {
    cls: 'copper',
    color: COPPER,
    pill: '⚠ LOOKING AT FRONT TIRE (NO SPIN)',
    label: `${deg}° Looking Straight Down`,
    readout: 'NO SPIN — STRAIGHT JUMP',
    cue: '⚠ If you stare at your front tire, your bike stops spinning! Turn your head and look over your shoulder right as you leave the ramp.',
  };
}

function snowState(deg: number) {
  if (Math.abs(deg) <= 5)
    return {
      cls: 'emerald',
      color: EMERALD,
      pill: `✓ FLAT BOARD (${deg}° — SMOOTH LAUNCH!)`,
      label: `${deg}° Flat Board (Sweet Spot!)`,
      contact: '100% FLAT & BALANCED ON SNOW',
      cue: '✓ Super smooth! Keeping the bottom of your snowboard flat on the ramp gives you a straight, easy jump with plenty of time to grab your board!',
    };
  if (deg < -5)
    return {
      cls: 'copper',
      color: COPPER,
      pill: `⚠ LEANING ON HEELS (${deg}°) — SLIP RISK!`,
      label: `${deg}° Digging Heel Edge`,
      contact: 'SLIPPING ON HEEL EDGE',
      cue: '⚠ Careful! Leaning back on your heels on the jump makes the snowboard slide out from under you. Stand flat on both feet!',
    };
  return {
    cls: 'gold',
    color: GOLD,
    pill: `⚡ LEANING ON TOES (+${deg}°) — WOBBLE!`,
    label: `+${deg}° Digging Toe Edge`,
    contact: 'TILTING ON TOE EDGE',
    cue: '⚡ Easy on the toes! Leaning too hard on your toes tilts your jump sideways. Keep the bottom of your board flat as you ride up the ramp.',
  };
}

const pillCls = (c: string) =>
  c === 'emerald' ? 'bg-emerald/20 text-emerald' : c === 'copper' ? 'bg-copper/20 text-copper' : 'bg-gold/20 text-gold';
const txtCls = (c: string) => (c === 'emerald' ? 'text-emerald' : c === 'copper' ? 'text-copper' : 'text-gold');

export function CheatCodes() {
  const [lean, setLean] = useState(16);
  const [brake, setBrake] = useState(52);
  const [bmxDeg, setBmxDeg] = useState(65);
  const [snowDeg, setSnowDeg] = useState(0);

  const s = skateState(lean);
  const b = brakeState(brake);
  const m = bmxState(bmxDeg);
  const w = snowState(snowDeg);
  const markerX = Math.round(440 - (brake / 100) * 440);

  return (
    <section id="cheatcodes" className="py-24 max-w-[1440px] mx-auto px-5 md:px-10 scroll-mt-24">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-copper/15 border border-copper/40 font-mono text-xs uppercase tracking-widest text-copper mb-3">
            <span>03 // PLAY WITH THE 4 PRO SECRETS</span>
            <span>•</span>
            <span>LEARN IN 30 SECONDS BEFORE YOU RIDE</span>
          </div>
          <h2 className="font-display font-black uppercase text-5xl sm:text-6xl text-white leading-none">
            4 EASY SECRETS TO FLYING LIKE A PRO.
          </h2>
        </div>
        <p className="text-sm text-titanium max-w-md leading-relaxed">
          Anyone can learn to catch air! Almost every wobble comes from one tiny habit — like leaning back on a skateboard or keeping a finger on your bike brake. <strong className="text-white">Drag the 4 sliders below to see how pros make jumping look effortless:</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* SECRET 01: SKATEBOARD & SCOOTER */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border !border-emerald/30 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald block">PRO SECRET 01 // SKATEBOARD &amp; SCOOTER</span>
                <h3 className="font-display font-bold text-3xl uppercase text-white mt-0.5">LEAN YOUR SHOULDER INTO THE RAMP</h3>
              </div>
              <span className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase font-bold ${pillCls(s.cls)}`}>{s.pill}</span>
            </div>
            <p className="text-xs text-titanium leading-relaxed mb-4">
              When you roll up a curved ramp, standing straight up pushes the skateboard out from under your feet. <strong className="text-white">Drag the slider to lean your front shoulder forward into the green +16° sweet spot!</strong>
            </p>
            <div className="photo-card h-[320px] p-5 flex flex-col justify-between mb-5">
              <Photo src={IMG.skateBowl} alt="Skateboarder riding a concrete bowl" className="brightness-[0.35] contrast-[1.15]" />
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 340">
                <line x1="30" y1="285" x2="570" y2="285" stroke="rgba(244,243,239,0.2)" strokeWidth="2" strokeDasharray="6 4" />
                <path d="M 110 285 Q 250 280 355 185 L 355 285 Z" fill="rgba(232,80,30,0.22)" stroke="#E8501E" strokeWidth="2.5" />
                <text x="125" y="308" fill="#8F96A0" fontFamily="var(--font-mono)" fontSize="10">SMOOTH ROLL-IN</text>
                <text x="315" y="308" fill="#E8501E" fontFamily="var(--font-mono)" fontSize="10">TAKE-OFF LIP</text>
                <line x1="270" y1="242" x2="232" y2="95" stroke="#10B981" strokeWidth="1.5" strokeDasharray="5 5" />
                <text x="150" y="85" fill="#10B981" fontFamily="var(--font-mono)" fontSize="10">THE +16° SWEET SPOT LINE</text>
                <g transform="translate(270, 242) rotate(-22)">
                  <rect x="-46" y="-6" width="92" height="7" rx="3.5" fill="#D4A359" stroke="#F4F3EF" strokeWidth="1.5" />
                  <circle cx="-28" cy="6" r="6" fill="#10B981" stroke="#060708" strokeWidth="2" />
                  <circle cx="28" cy="6" r="6" fill="#10B981" stroke="#060708" strokeWidth="2" />
                  <g transform={`rotate(${lean - 16})`} style={{ transition: 'transform 0.15s' }}>
                    <line x1="-22" y1="-6" x2="-14" y2="-52" stroke="#F4F3EF" strokeWidth="3.5" strokeLinecap="round" />
                    <line x1="22" y1="-6" x2="16" y2="-52" stroke="#F4F3EF" strokeWidth="3.5" strokeLinecap="round" />
                    <line x1="-14" y1="-52" x2="16" y2="-52" stroke="#D4A359" strokeWidth="4" />
                    <line x1="0" y1="-52" x2="0" y2="-112" stroke={s.color} strokeWidth="4.5" strokeLinecap="round" />
                    <line x1="0" y1="-98" x2="-30" y2="-75" stroke="#F4F3EF" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="0" y1="-98" x2="34" y2="-82" stroke="#F4F3EF" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="0" cy="-128" r="12" fill="#060708" stroke={s.color} strokeWidth="3" />
                    <line x1="0" y1="-78" x2="0" y2="2" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" />
                    <circle cx="0" cy="-78" r="6" fill="#38BDF8" />
                  </g>
                </g>
              </svg>
              <div className="relative z-10">
                <span className="px-2.5 py-1 rounded bg-obsidian/85 border border-white/15 font-mono text-[10px] text-alabaster">
                  BALANCE: <strong className={txtCls(s.cls)}>{s.ratio}</strong>
                </span>
              </div>
              <div className="relative z-10 glass-panel rounded-xl p-3 mt-auto">
                <p className="text-xs font-mono text-alabaster">{s.cue}</p>
              </div>
            </div>
          </div>
          <div className="bg-obsidian rounded-xl p-4 border border-white/10">
            <div className="flex flex-wrap justify-between gap-2 text-xs font-mono mb-2">
              <span className="text-titanium">DRAG TO LEAN YOUR FRONT SHOULDER:</span>
              <span className={`font-bold ${txtCls(s.cls)}`}>{s.label}</span>
            </div>
            <input type="range" min={-15} max={28} value={lean} onChange={(e) => setLean(Number(e.target.value))} className="w-full cursor-pointer h-2" style={{ accentColor: EMERALD }} aria-label="Shoulder lean" />
            <div className="flex justify-between gap-2 text-[10px] font-mono text-titanium mt-1.5">
              <span className="text-copper">-15° TOO FAR BACK</span><span className="text-emerald">+16° SWEET SPOT!</span><span className="text-gold">+28° TOO FAR FORWARD</span>
            </div>
          </div>
        </div>

        {/* SECRET 02: MTB & BMX BRAKE RELEASE */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border !border-gold/30 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold block">PRO SECRET 02 // MOUNTAIN BIKE &amp; BMX</span>
                <h3 className="font-display font-bold text-3xl uppercase text-white mt-0.5">TAKE YOUR FINGER OFF THE BRAKE</h3>
              </div>
              <span className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase font-bold ${pillCls(b.cls)}`}>{b.pill}</span>
            </div>
            <p className="text-xs text-titanium leading-relaxed mb-4">
              Pulling your brakes on the ramp makes your front wheel dive down. <strong className="text-white">Pick your speed early, then take your finger off the brake 3 bike-lengths before the ramp and hold the grip tight!</strong>
            </p>
            <div className="photo-card h-[320px] p-5 flex flex-col justify-between mb-5">
              <Photo src={IMG.mtbFork} alt="Mountain bike front wheel" className="brightness-[0.32] contrast-[1.15]" />
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 340">
                <g transform="translate(55, 35)">
                  <rect x="0" y="0" width="235" height="125" rx="10" fill="rgba(6,7,8,0.82)" stroke="rgba(244,243,239,0.15)" />
                  <text x="14" y="22" fill="#8F96A0" fontFamily="var(--font-mono)" fontSize="10">HANDLEBAR VIEW // YOUR FINGER</text>
                  <rect x="20" y="42" width="190" height="18" rx="9" fill="#262A32" stroke="#8F96A0" strokeWidth="1.5" />
                  <rect x="110" y="39" width="90" height="24" rx="4" fill="#E8501E" opacity="0.85" />
                  <text x="122" y="54" fill="#FFFFFF" fontFamily="var(--font-mono)" fontWeight="700" fontSize="9">HANDLEBAR GRIP</text>
                  <rect x="82" y="38" width="20" height="26" rx="3" fill="#8F96A0" />
                  <g transform={`translate(92, 62) rotate(${b.lever})`}>
                    <path d="M 0 0 L 65 26 C 72 28 76 23 70 18 L 10 -4 Z" fill="#D4A359" stroke="#F4F3EF" strokeWidth="1.2" />
                  </g>
                  <g transform={`translate(${b.finger[0]}, ${b.finger[1]})`}>
                    <rect x="-10" y="-14" width="20" height="28" rx="8" fill={b.color} stroke="#060708" strokeWidth="2" />
                    <text x="-42" y="32" fill={b.color} fontFamily="var(--font-mono)" fontWeight="700" fontSize="10">{b.fingerTxt}</text>
                  </g>
                </g>
                <g transform="translate(310, 35)">
                  <rect x="0" y="0" width="235" height="125" rx="10" fill="rgba(6,7,8,0.82)" stroke="rgba(244,243,239,0.15)" />
                  <text x="14" y="22" fill="#8F96A0" fontFamily="var(--font-mono)" fontSize="10">YOUR JUMP POWER METER</text>
                  <text x="14" y="52" fill="#F4F3EF" fontFamily="var(--font-display)" fontWeight="700" fontSize="24">{b.fork}</text>
                  <text x="14" y="76" fill={b.color} fontFamily="var(--font-mono)" fontSize="11">{b.pop}</text>
                  <text x="14" y="102" fill="#8F96A0" fontFamily="var(--font-mono)" fontSize="10">{b.rotor}</text>
                </g>
                <g transform="translate(40, 215)">
                  <rect x="0" y="25" width="220" height="12" rx="4" fill="rgba(212,163,89,0.35)" stroke="#D4A359" />
                  <text x="8" y="18" fill="#D4A359" fontFamily="var(--font-mono)" fontSize="10">SET YOUR SPEED HERE</text>
                  <line x1="220" y1="0" x2="220" y2="55" stroke="#10B981" strokeWidth="2.5" strokeDasharray="4 3" />
                  <text x="155" y="-5" fill="#10B981" fontFamily="var(--font-mono)" fontWeight="700" fontSize="10">3 BIKE-LENGTHS: FINGERS OFF BRAKES!</text>
                  <rect x="220" y="25" width="220" height="12" rx="4" fill="rgba(16,185,129,0.28)" stroke="#10B981" />
                  <text x="235" y="18" fill="#10B981" fontFamily="var(--font-mono)" fontSize="10">ROLL FREE &amp; PUSH WITH LEGS</text>
                  <polygon points="440,37 515,37 515,-8" fill="#E8501E" />
                  <g transform={`translate(${markerX}, 31)`} style={{ transition: 'transform 0.15s' }}>
                    <circle cx="0" cy="0" r="9" fill={b.color} stroke="#060708" strokeWidth="2.5" />
                  </g>
                </g>
              </svg>
              <div className="relative z-10 glass-panel rounded-xl p-3 mt-auto">
                <p className="text-xs font-mono text-alabaster">{b.cue}</p>
              </div>
            </div>
          </div>
          <div className="bg-obsidian rounded-xl p-4 border border-white/10">
            <div className="flex flex-wrap justify-between gap-2 text-xs font-mono mb-2">
              <span className="text-titanium">DRAG TO PICK WHERE YOU LET GO OF THE BRAKE:</span>
              <span className={`font-bold ${txtCls(b.cls)}`}>{b.dist}</span>
            </div>
            <input type="range" min={0} max={100} value={brake} onChange={(e) => setBrake(Number(e.target.value))} className="w-full cursor-pointer h-2" style={{ accentColor: COPPER }} aria-label="Brake release point" />
            <div className="flex justify-between gap-2 text-[10px] font-mono text-titanium mt-1.5">
              <span className="text-copper">BRAKING ON RAMP</span><span className="text-gold">A LITTLE LATE</span><span className="text-emerald">3+ BIKE-LENGTHS EARLY!</span>
            </div>
          </div>
        </div>

        {/* SECRET 03: BMX 360 HEAD SPOT */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border !border-copper/30 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-copper block">PRO SECRET 03 // BMX SPINS</span>
                <h3 className="font-display font-bold text-3xl uppercase text-white mt-0.5">LOOK OVER YOUR SHOULDER TO SPIN 360°</h3>
              </div>
              <span className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase font-bold ${pillCls(m.cls)}`}>{m.pill}</span>
            </div>
            <p className="text-xs text-titanium leading-relaxed mb-4">
              Your bike always goes where your eyes look! If you look down at your front tire, you stop spinning. <strong className="text-white">Drag the slider to turn your chin over your shoulder and watch your bike spin a full 360°!</strong>
            </p>
            <div className="photo-card h-[320px] p-5 flex flex-col justify-between mb-5">
              <Photo src={IMG.bmxSky} alt="BMX 360 Spin" className="brightness-[0.34] contrast-[1.15]" />
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 340">
                <rect x="55" y="110" width="140" height="80" rx="6" fill="rgba(232,80,30,0.25)" stroke="#E8501E" strokeWidth="2" />
                <text x="68" y="154" fill="#F4F3EF" fontFamily="var(--font-mono)" fontSize="10">PACK 2.0 RAMP</text>
                <g transform="translate(355, 150)">
                  <circle cx="0" cy="0" r="88" fill="rgba(6,7,8,0.75)" stroke="rgba(244,243,239,0.2)" strokeWidth="2" strokeDasharray="6 4" />
                  <path d="M -88 0 A 88 88 0 1 1 88 0" fill="none" stroke={m.color} strokeWidth="4" />
                  <g transform={`rotate(${bmxDeg})`} style={{ transition: 'transform 0.15s' }}>
                    <line x1="-42" y1="0" x2="42" y2="0" stroke="#F4F3EF" strokeWidth="5" strokeLinecap="round" />
                    <line x1="22" y1="-26" x2="22" y2="26" stroke="#D4A359" strokeWidth="4" strokeLinecap="round" />
                    <rect x="-14" y="-22" width="24" height="44" rx="8" fill="#181B20" stroke="#F4F3EF" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="13" fill={m.color} />
                    <polygon points="0,0 75,-45 75,45" fill="rgba(16,185,129,0.22)" />
                  </g>
                  <text x="-48" y="115" fill={m.color} fontFamily="var(--font-mono)" fontWeight="700" fontSize="11">{m.readout}</text>
                </g>
              </svg>
              <div className="relative z-10">
                <span className="px-2.5 py-1 rounded bg-obsidian/85 border border-white/15 font-mono text-[10px] text-alabaster">
                  PRO RULE: <strong className="text-gold">WHERE YOUR EYES GO, YOUR BIKE GOES!</strong>
                </span>
              </div>
              <div className="relative z-10 glass-panel rounded-xl p-3 mt-auto">
                <p className="text-xs font-mono text-alabaster">{m.cue}</p>
              </div>
            </div>
          </div>
          <div className="bg-obsidian rounded-xl p-4 border border-white/10">
            <div className="flex flex-wrap justify-between gap-2 text-xs font-mono mb-2">
              <span className="text-titanium">DRAG TO TURN YOUR HEAD &amp; EYES:</span>
              <span className={`font-bold ${txtCls(m.cls)}`}>{m.label}</span>
            </div>
            <input type="range" min={0} max={80} value={bmxDeg} onChange={(e) => setBmxDeg(Number(e.target.value))} className="w-full cursor-pointer h-2" style={{ accentColor: COPPER }} aria-label="BMX head turn angle" />
            <div className="flex justify-between gap-2 text-[10px] font-mono text-titanium mt-1.5">
              <span className="text-copper">LOOKING AT TIRE</span><span className="text-gold">HALF TURN</span><span className="text-emerald">LOOKING OVER SHOULDER (360°!)</span>
            </div>
          </div>
        </div>

        {/* SECRET 04: SNOWBOARD FLAT BOARD */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border !border-sky/30 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-sky block">PRO SECRET 04 // SNOWBOARD JUMPS</span>
                <h3 className="font-display font-bold text-3xl uppercase text-white mt-0.5">KEEP YOUR SNOWBOARD FLAT ON THE JUMP</h3>
              </div>
              <span className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase font-bold ${pillCls(w.cls)}`}>{w.pill}</span>
            </div>
            <p className="text-xs text-titanium leading-relaxed mb-4">
              Tilting on your heel edge or toe edge on the jump makes your board slip sideways. <strong className="text-white">Drag the slider to 0° so the bottom of your snowboard glides completely flat and pops straight up!</strong>
            </p>
            <div className="photo-card h-[320px] p-5 flex flex-col justify-between mb-5">
              <Photo src={IMG.snowAlpine} alt="Snowboarder jumping" className="brightness-[0.36] contrast-[1.15]" />
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 340">
                <polygon points="150,260 450,260 410,195 190,195" fill="rgba(56,189,248,0.18)" stroke="#38BDF8" strokeWidth="2" />
                <line x1="170" y1="195" x2="430" y2="195" stroke="#10B981" strokeWidth="2.5" strokeDasharray="6 4" />
                <text x="215" y="282" fill="#F4F3EF" fontFamily="var(--font-mono)" fontSize="10">JUMP TAKE-OFF (KEEP BOARD 0° FLAT)</text>
                <g transform={`translate(300, 192) rotate(${snowDeg})`} style={{ transition: 'transform 0.15s' }}>
                  <rect x="-85" y="-5" width="170" height="10" rx="5" fill="#38BDF8" stroke="#F4F3EF" strokeWidth="2" />
                  <circle cx="-82" cy="0" r="5" fill="#E8501E" />
                  <circle cx="82" cy="0" r="5" fill="#D4A359" />
                  <line x1="-35" y1="-5" x2="-28" y2="-65" stroke="#F4F3EF" strokeWidth="4" strokeLinecap="round" />
                  <line x1="35" y1="-5" x2="28" y2="-65" stroke="#F4F3EF" strokeWidth="4" strokeLinecap="round" />
                  <rect x="-34" y="-105" width="68" height="42" rx="10" fill="#101820" stroke={w.color} strokeWidth="2.5" />
                  <text x="-24" y="-80" fill="#F4F3EF" fontFamily="var(--font-mono)" fontSize="10">BALANCED</text>
                </g>
              </svg>
              <div className="relative z-10">
                <span className="px-2.5 py-1 rounded bg-obsidian/85 border border-white/15 font-mono text-[10px] text-alabaster">
                  BOARD BALANCE: <strong className={txtCls(w.cls)}>{w.contact}</strong>
                </span>
              </div>
              <div className="relative z-10 glass-panel rounded-xl p-3 mt-auto">
                <p className="text-xs font-mono text-alabaster">{w.cue}</p>
              </div>
            </div>
          </div>
          <div className="bg-obsidian rounded-xl p-4 border border-white/10">
            <div className="flex flex-wrap justify-between gap-2 text-xs font-mono mb-2">
              <span className="text-titanium">DRAG TO LEVEL YOUR SNOWBOARD FLAT:</span>
              <span className={`font-bold ${txtCls(w.cls)}`}>{w.label}</span>
            </div>
            <input type="range" min={-25} max={25} value={snowDeg} onChange={(e) => setSnowDeg(Number(e.target.value))} className="w-full cursor-pointer h-2" style={{ accentColor: '#38BDF8' }} aria-label="Snowboard edge tilt" />
            <div className="flex justify-between gap-2 text-[10px] font-mono text-titanium mt-1.5">
              <span className="text-copper">-25° ON HEELS</span><span className="text-emerald">0° FLAT BOARD (SWEET SPOT!)</span><span className="text-gold">+25° ON TOES</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
