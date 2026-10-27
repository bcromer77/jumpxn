'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { usePlayer, type SportKey } from '@/components/providers';
import { IMG, Photo } from './bits';

type Mission = { id: string; title: string; done: boolean; locked?: boolean; kp: string; mistake: string; safety: string };

const START: Record<SportKey, Mission[]> = {
  bmx: [
    { id: 'bmx-1', title: 'Level 01: 15-Second Setup & First Roll-In', done: true, kp: 'Click all legs into Level 1 and pick a flat spot with plenty of open space to land.', mistake: 'Going too fast on your very first roll-in.', safety: 'BMX helmet & gloves on!' },
    { id: 'bmx-2', title: 'Level 02: Stand Tall On Your Pedals', done: true, kp: 'Keep your pedals flat and level, bend your knees slightly, and push through your feet.', mistake: 'Leaning your chest too far over the handlebars.', safety: 'Practice lifting your front wheel on flat ground first.' },
    { id: 'bmx-3', title: 'Level 03: Push With Your Legs For Easy Air', done: true, kp: 'Push down with your feet as your front tire climbs the ramp, then stand tall right at the top!', mistake: 'Yanking the handlebars up with your arms.', safety: 'Check all latches are clicked in before riding.' },
    { id: 'bmx-4', title: 'Level 04: Smooth Two-Wheel Landings', done: false, kp: 'Look at your landing spot while you are in the air and bend your knees like springs when you touch down.', mistake: 'Landing with stiff legs or pulling the brakes in mid-air.', safety: 'Knee and elbow pads recommended.' },
    { id: 'bmx-5', title: 'Boss Level 05: Spin Your First 180 & 360!', done: false, locked: true, kp: 'Pop tall off the lip, turn your chin over your shoulder, and look at your landing spot — your bike will follow your eyes!', mistake: 'Looking down at your front tire while spinning.', safety: 'Unlocks when you finish Level 04 or check your jump video above!' },
  ],
  mtb: [
    { id: 'mtb-1', title: 'Level 01: Finger Off The Brake (3-Length Rule)', done: true, kp: 'Set your speed early, then take your finger off the brake 3 bike-lengths before the ramp.', mistake: 'Pulling the brakes while riding up the ramp.', safety: 'Helmet + knee pads strapped on.' },
    { id: 'mtb-2', title: 'Level 02: Push Into The Ramp With Your Feet', done: true, kp: 'Push down evenly with both feet in the curve of the ramp so your bike boosts you up smoothly.', mistake: 'Jumping too early before your wheels reach the top edge.', safety: 'Start on Level 1 height.' },
    { id: 'mtb-3', title: 'Boss Level 03: Your First Mid-Air Style Whip!', done: false, locked: true, kp: 'At your highest point in the air, turn the bars slightly and kick your back wheel out, then bring it back straight before landing!', mistake: 'Stiffening your arms in the air.', safety: 'Make sure your landing zone is wide open.' },
  ],
  skate: [
    { id: 'sk-1', title: 'Level 01: Lean Your Shoulder Into The Ramp (+16°)', done: true, kp: 'Lean your front shoulder slightly forward into the ramp curve so the skateboard stays right under your shoes.', mistake: 'Standing straight up and letting the board slip out.', safety: 'Helmet, wrist guards, and knee pads.' },
    { id: 'sk-2', title: 'Level 02: Snap The Tail At The Top Edge', done: true, kp: 'Wait until your front wheels reach the very top of the ramp before popping the tail.', mistake: 'Popping too early at the bottom of the curve.', safety: 'Ride on dry, clean pavement.' },
    { id: 'sk-3', title: 'Boss Level 03: Grab Your Board In Mid-Air (Indy Grab)!', done: false, locked: true, kp: 'Bend your knees low on roll-in, pop tall off the lip, bring your knees up, and grab the middle edge of your board!', mistake: 'Bending your back down instead of lifting your knees up.', safety: 'Knee pads and helmet required!' },
  ],
  snow: [
    { id: 'sn-1', title: 'Level 01: Ride Up With A Flat Board (0°)', done: true, kp: 'Finish your turns early and ride onto the jump with the bottom of your snowboard completely flat.', mistake: 'Digging your heel edge or toe edge into the ramp.', safety: 'Snow helmet & wrist guards on.' },
    { id: 'sn-2', title: 'Level 02: Pop Off Both Feet Evenly', done: true, kp: 'Jump up off both feet at the same time right as the nose of your board leaves the jump.', mistake: 'Leaning too far back on your tail.', safety: 'Check the landing snow first.' },
    { id: 'sn-3', title: 'Boss Level 03: Grab Your Board In The Air!', done: false, locked: true, kp: 'Pull your knees up toward your chest at the highest point in the air and grab the edge of your board!', mistake: 'Reaching down with your back instead of lifting your knees.', safety: 'Spot your landing early.' },
  ],
  scoot: [
    { id: 'sc-1', title: 'Level 01: Keep Your Handlebars Straight', done: true, kp: 'Hold both grips tight and push down through the deck with both feet as you roll up the ramp.', mistake: 'Twisting the front wheel as you take off.', safety: 'Helmet, knee & elbow pads.' },
    { id: 'sc-2', title: 'Boss Level 02: Land Your First Tailwhip!', done: false, locked: true, kp: 'Jump tall off the ramp first, flick the deck around with your back foot, and catch it with your front foot before landing!', mistake: 'Flicking the deck before your back wheel leaves the ramp.', safety: 'Master smooth two-foot landings first.' },
  ],
};

const CAMS = [
  { label: 'ANGLE 1: SIDE VIEW', short: 'Side View', img: IMG.bmxSunset2 },
  { label: 'ANGLE 2: MTB TRAIL', short: 'MTB View', img: IMG.dirtMountains },
  { label: 'ANGLE 3: SKATE PARK', short: 'Skate View', img: IMG.skateBowl },
  { label: 'ANGLE 4: SNOW JUMP', short: 'Snow View', img: IMG.snowAlpine },
];

const TABS: { key: SportKey; label: string }[] = [
  { key: 'bmx', label: '🚲 BMX' },
  { key: 'mtb', label: '🚵 MTB' },
  { key: 'skate', label: '🛹 Skate' },
  { key: 'snow', label: '🏂 Snow' },
  { key: 'scoot', label: '🛴 Scoot' },
];

export function SkillTree() {
  const { addXp, sport, setSport, lastAnalysis, aiUnlockedMissions } = usePlayer();
  const [data, setData] = useState(START);
  const [idx, setIdx] = useState(0);
  const [cam, setCam] = useState(0);

  const list = data[sport] || data.bmx;
  const prevDone = (i: number) => list.slice(0, i).every((l) => l.done || aiUnlockedMissions[l.id]);
  const active = list[idx] ?? list[0];

  const select = (i: number) => {
    const m = list[i];
    const unlockedByAi = aiUnlockedMissions[m.id];
    if (m.locked && !unlockedByAi && !prevDone(i)) {
      toast('🔒 Finish the previous level or click "Check My Jump Now" in the Replay Studio above to unlock Boss Level!');
      return;
    }
    setIdx(i);
  };

  const complete = async () => {
    if (active.done || aiUnlockedMissions[active.id]) {
      toast('Level already completed! Pick the next one.');
      return;
    }
    setData((d) => ({ ...d, [sport]: d[sport].map((m, i) => (i === idx ? { ...m, done: true } : m)) }));
    if (idx + 1 < list.length) setIdx(idx + 1);
    addXp(200, 'Level Completed! +200 XP');
    try {
      await fetch('/api/coaching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: active.id, discipline: sport.toUpperCase(), action: 'save' }),
      });
    } catch {
      // Guest player
    }
  };

  return (
    <section id="skilltree" className="scroll-mt-24 py-24 max-w-[1440px] mx-auto px-5 md:px-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold block mb-2">
            06 // LEVEL UP LIKE A VIDEO GAME
          </span>
          <h2 className="font-display font-black uppercase text-5xl sm:text-6xl text-white leading-none">
            FROM FIRST ROLL-IN TO BOSS TRICKS.
          </h2>
        </div>
        <p className="text-sm text-titanium max-w-md leading-relaxed">
          You don&apos;t fight the final boss on Level 1! Beat each easy step-by-step level, earn XP badges, and unlock 180s, 360s, whips, and grabs once your landings feel super steady.
        </p>
      </div>

      <div className="glass-panel rounded-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase text-gold">PICK YOUR SPORT</span>
            <span className="font-mono text-xs text-emerald">
              {list.filter((l) => l.done || aiUnlockedMissions[l.id]).length} / {list.length} LEVELS UNLOCKED
            </span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 bg-obsidian p-1.5 rounded-xl border border-white/10">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => {
                  setSport(t.key, false);
                  setIdx(0);
                }}
                className={`py-2 rounded-lg text-[11px] font-mono uppercase transition ${
                  sport === t.key ? 'bg-copper text-white font-semibold' : 'text-titanium hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="space-y-2.5">
            {list.map((m, i) => {
              const isDone = m.done || aiUnlockedMissions[m.id];
              const locked = m.locked && !isDone && !prevDone(i);
              return (
                <button
                  key={m.id}
                  onClick={() => select(i)}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between gap-3 ${
                    i === idx ? 'bg-copper/15 border-copper text-white' : 'bg-obsidian/70 border-white/10 text-alabaster/80'
                  }`}
                >
                  <span className="text-xs font-medium">
                    {isDone ? '✓ ' : locked ? '🔒 ' : '● '}
                    {m.title}
                  </span>
                  <span className="font-mono text-[10px] uppercase text-titanium shrink-0">
                    {aiUnlockedMissions[m.id] ? 'UNLOCKED!' : locked ? 'Locked' : isDone ? '+200 XP' : 'Play'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-obsidian border border-sky/30 space-y-1.5">
            <span className="font-mono text-[10px] uppercase text-sky block">
              ⚡ YOUR 3 EASY STEPS FOR TODAY ({lastAnalysis.skillTreeUpdate.badgeEarned}):
            </span>
            {lastAnalysis.skillTreeUpdate.nextThreeSendsDrill.map((d, i) => (
              <p key={i} className="text-[11px] font-mono text-alabaster/90">
                {i + 1}. {d}
              </p>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="photo-card h-[400px] relative p-6 flex flex-col justify-between rounded-2xl overflow-hidden">
            <Photo key={CAMS[cam].img} src={CAMS[cam].img} alt={`Coaching angle: ${CAMS[cam].label}`} className="bg-photo brightness-[0.75]" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/60" />
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-copper text-white font-mono text-[11px] uppercase font-semibold">
                {sport.toUpperCase()} // {active.title.toUpperCase()}
              </span>
              <div className="flex flex-wrap items-center gap-1.5 bg-obsidian/85 p-1 rounded-lg border border-white/15">
                {CAMS.map((c, i) => (
                  <button
                    key={c.short}
                    onClick={() => setCam(i)}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono ${
                      cam === i ? 'bg-white/15 text-white' : 'text-titanium hover:text-white'
                    }`}
                  >
                    {c.short}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative z-10 my-auto">
              <div className="glass-pill px-4 py-2 rounded-xl inline-block max-w-full">
                <span className="font-mono text-xs text-gold block">{CAMS[cam].label} • SLOW-MOTION LESSON</span>
                <p className="font-display font-bold text-2xl sm:text-3xl uppercase text-white">
                  {active.title.replace(/^.*?:\s*/, '')}
                </p>
              </div>
            </div>
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/15">
              <button onClick={() => toast('Playing at 0.25x super slow-motion!')} className="px-3 py-1 rounded bg-copper text-white font-mono text-[11px]">
                0.25x Super Slow-Mo
              </button>
              <button onClick={complete} className="px-4 py-1.5 rounded-lg bg-emerald text-obsidian font-mono text-xs uppercase font-semibold hover:opacity-90 transition">
                ✓ I Landed It! (+200 XP &amp; Unlock Next Level)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {[
              { k: 'HOW TO DO IT', c: 'text-emerald', v: active.kp },
              { k: 'WHAT TO AVOID', c: 'text-gold', v: active.mistake },
              { k: 'SAFETY CHECK', c: 'text-copper', v: lastAnalysis.skillTreeUpdate.safetyCue || active.safety },
            ].map((b) => (
              <div key={b.k} className="p-4 rounded-xl bg-obsidian/80 border border-white/10">
                <span className={`font-mono text-[10px] uppercase block mb-1 ${b.c}`}>{b.k}</span>
                <p className="text-alabaster/90">{b.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
