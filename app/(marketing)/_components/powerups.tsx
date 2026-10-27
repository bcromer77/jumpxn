'use client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { usePlayer } from '@/components/providers';

const DIALOGUES = [
  {
    label: 'ASK ABOUT BRAKES',
    tone: 'text-copper',
    q: '"Did I tap my brakes too close to the ramp?"',
    rider: '"Hey Coach, did I tap my brakes too close to the ramp on that jump?"',
    coach:
      'You held your brake until right before the ramp, which squished your front wheel down. Next jump, take your finger off the brake three bike-lengths early and wrap all five fingers around the grip!',
  },
  {
    label: 'ASK ABOUT SKATE LEAN',
    tone: 'text-gold',
    q: '"How do I keep the skateboard under my feet?"',
    rider: '"How do I lean on the ramp so my skateboard doesn't slip out?"',
    coach:
      'Lean your front shoulder forward into the curve of the ramp, just a little bit, so your weight stays fifty-fifty over both wheels all the way into the air!',
  },
  {
    label: 'ASK ABOUT 360 SPINS',
    tone: 'text-emerald',
    q: '"How do I spin a full 360?"',
    rider: '"Why did my 360 spin stop halfway around?"',
    coach:
      'Your shoulders started spinning, but your eyes looked down at your front wheel! Turn your chin over your shoulder and look at your landing spot — your bike will follow your eyes all the way around!',
  },
];

const CLIPS = [
  { title: 'Jump #1 (Warm-Up)', air: '0.72s Air Time', note: 'Smooth roll-in! Pulled up with arms a tiny bit early.', cls: 'bg-copper text-white' },
  { title: 'Jump #2 (Locked In)', air: '0.81s Air Time', note: 'Let go of the brakes early + strong leg push!', cls: 'bg-gold text-obsidian font-bold' },
  { title: 'Jump #3 (Biggest Air!)', air: '0.89s Air Time', note: 'Best jump of the day! Landed super smooth on both wheels.', cls: 'bg-emerald text-obsidian font-bold' },
  { title: 'Jump #4 (Golden Hour)', air: '0.78s Air Time', note: 'Awesome style in mid-air. Ready to share!', cls: 'bg-sky text-obsidian font-bold' },
];

const SPOTS: Record<string, { label: string; weather: string; list: { name: string; surface: string }[] }> = {
  shanghai: {
    label: 'Shanghai, CN',
    weather: '21°C • Sunny & Dry (Perfect Grip)',
    list: [
      { name: 'SMP Skatepark (Yangpu District — World’s Largest)', surface: 'Pro concrete bowls, plazas & wide flat banks' },
      { name: 'West Bund Action Sports Plaza (Xuhui Riverside)', surface: 'Smooth riverside concrete — awesome sunset sessions' },
      { name: 'Pujiang Country Park Bike & Pump Zone', surface: 'Wide open flat grass & tarmac run-outs' },
    ],
  },
  chengdu: {
    label: 'Chengdu, CN',
    weather: '20°C • Light Breeze (Pro Park Weather)',
    list: [
      { name: 'Xindu尖锋旱雪四季滑雪场 (Jianfeng Dry-Slope & Action Park)', surface: 'Olympic training airbag & jump progression zone' },
      { name: 'Dong’an Lake Sports Park Action Plaza', surface: 'Smooth plaza lines & beginner-friendly flat ground' },
      { name: 'Jincheng Lake Greenway Pump & Skills Zone', surface: 'Flowy bike paths & open session lawns' },
    ],
  },
  beijing: {
    label: 'Beijing & Chongli, CN',
    weather: '18°C • Crisp & Clear Sky',
    list: [
      { name: 'Shougang Big Air Action Park (Shijingshan)', surface: 'Iconic Olympic arena plaza & smooth concrete' },
      { name: 'Longfor Chang’an Tianjie Skate & BMX Plaza', surface: 'Smooth street-style concrete & wide run-ups' },
      { name: 'Chongli Genting & Thaiwoo Bike/Snow Park', surface: 'Summer MTB dirt lines & winter snowboard kickers' },
    ],
  },
  shenzhen: {
    label: 'Shenzhen, CN',
    weather: '25°C • Golden Hour',
    list: [
      { name: 'Shenzhen Bay Extreme Sports Park (Nanshan)', surface: 'Sea-breeze concrete bowls & huge flat warm-up zone' },
      { name: 'Guangming Velodrome & BMX Pump Track', surface: 'World-class BMX & MTB progression track' },
    ],
  },
  global: {
    label: 'Global Arenas',
    weather: 'All-Season Ready',
    list: [
      { name: 'Bushy Park Action Plaza (Dublin) & BaySixty6 (London)', surface: 'Smooth concrete & covered transitions' },
      { name: 'Vans Huntington Beach (SoCal) & Whistler Skills Park', surface: 'Concrete bowls & progressive dirt tabletops' },
    ],
  },
};

function Card({
  tone,
  kicker,
  title,
  badge,
  badgeCls,
  children,
  footL,
  footR,
  footRCls,
}: {
  tone: string;
  kicker: string;
  title: string;
  badge: React.ReactNode;
  badgeCls: string;
  children: React.ReactNode;
  footL: React.ReactNode;
  footR: React.ReactNode;
  footRCls: string;
}) {
  return (
    <div className={`glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between border ${tone}`}>
      <div>
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
          <div>
            <span className={`font-mono text-[10px] uppercase tracking-widest block ${footRCls}`}>{kicker}</span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase text-white mt-0.5 leading-tight">
              {title}
            </h3>
          </div>
          <span className={`px-2.5 py-1 rounded font-mono text-[10px] uppercase shrink-0 ${badgeCls}`}>{badge}</span>
        </div>
        {children}
      </div>
      <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between gap-3 text-[11px] font-mono text-titanium">
        {footL}
        <span className={footRCls}>{footR}</span>
      </div>
    </div>
  );
}

export function PowerUps() {
  const { addXp, sport, lastAnalysis } = usePlayer();
  const [riderQ, setRiderQ] = useState<string | null>(null);
  const [coachReply, setCoachReply] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [clip, setClip] = useState<number | null>(2);
  const [scanning, setScanning] = useState<'idle' | 'scan' | 'done'>('done');
  const [searchQuery, setSearchQuery] = useState('show me clean 360s on Level 3');
  const [searchResults, setSearchResults] = useState<
    { id: string; title: string; hangtime: string; setting: string; similarity: number }[]
  >([]);
  const [city, setCity] = useState('shanghai');
  const [prompt, setPrompt] = useState(
    'I want to jump my mountain bike off Pack 2.0 and land smoothly on both wheels!'
  );
  const [plan, setPlan] = useState<string | null>(null);
  const [planLoading, setPlanLoading] = useState(false);

  useEffect(
    () => () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    },
    []
  );

  const speakOutLoud = (text: string) => {
    setSpeaking(true);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1.04;
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(u);
    } else {
      setTimeout(() => setSpeaking(false), 3800);
    }
  };

  const askLiveCoach = async (questionText: string, fallbackCoach?: string) => {
    setRiderQ(questionText);
    try {
      const res = await fetch('/api/ai/live-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'voice-coach',
          sport,
          question: questionText,
          priorAnalysis: lastAnalysis,
        }),
      });
      const data = await res.json();
      const reply = data?.reply || fallbackCoach || lastAnalysis.biomechanics.voiceCoachSummary;
      setCoachReply(reply);
      speakOutLoud(reply);
      addXp(50, 'Asked Your Voice Coach!');
    } catch {
      const reply = fallbackCoach || lastAnalysis.biomechanics.voiceCoachSummary;
      setCoachReply(reply);
      speakOutLoud(reply);
    }
  };

  const startVoiceMic = () => {
    const SpeechRec =
      typeof window !== 'undefined' &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
    if (!SpeechRec) {
      askLiveCoach('Hey Coach, how did my last jump look?');
      return;
    }
    const rec = new SpeechRec();
    rec.lang = 'en-US';
    setListening(true);
    rec.onresult = (e: any) => {
      const transcript = e.results?.[0]?.[0]?.transcript;
      setListening(false);
      if (transcript) askLiveCoach(transcript);
    };
    rec.onerror = () => {
      setListening(false);
      askLiveCoach('Hey Coach, did I let go of my brakes early enough?');
    };
    rec.start();
  };

  const mute = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    setSpeaking(false);
    toast('Voice coach muted.');
  };

  const runClipSearch = async () => {
    try {
      const res = await fetch('/api/ai/omni-flash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'semantic-search', query: searchQuery }),
      });
      const data = await res.json();
      if (data?.results) {
        setSearchResults(data.results.slice(0, 2));
        addXp(50, 'Found Pro Trick Clips!');
      }
    } catch {
      toast.error('Search busy — try again!');
    }
  };

  const buildPlan = async () => {
    if (!prompt.trim()) {
      toast.error('Tell us what you ride and what trick you want to learn!');
      return;
    }
    setPlanLoading(true);
    try {
      const res = await fetch('/api/ai/live-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'trick-doctor',
          sport,
          question: prompt,
          priorAnalysis: lastAnalysis,
        }),
      });
      const data = await res.json();
      setPlan(data?.reply || null);
      addXp(75, 'Unlocked Your 3-Step Trick Plan!');
    } catch {
      toast.error('Could not build plan right now');
    }
    setPlanLoading(false);
  };

  return (
    <section id="powerups" className="scroll-mt-24 py-24 bg-carbon border-y border-white/10">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky/15 border border-sky/40 font-mono text-xs uppercase tracking-widest text-sky mb-3">
              <span>05 // YOUR POCKET COACH &amp; HIGHLIGHT STUDIO</span>
            </div>
            <h2 className="font-display font-black uppercase text-5xl sm:text-6xl text-white leading-none">
              PROP UP YOUR PHONE. WE DO THE REST.
            </h2>
          </div>
          <p className="text-sm text-titanium max-w-md leading-relaxed">
            You don&apos;t need a camera crew or a private coach. Prop your phone against your backpack, ride past, and let JumpXN clip your best jumps and talk you through your next trick!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* POWER-UP 01: HANDS-FREE VOICE COACH */}
          <Card
            tone="border-sky/25"
            kicker="POWER-UP 01 // HANDS-FREE EARBUD COACH"
            title="TALK TO YOUR COACH WITH GLOVES ON"
            badge={listening ? 'LISTENING...' : speaking ? 'COACH TALKING' : 'VOICE READY'}
            badgeCls={
              listening || speaking ? 'bg-sky text-obsidian font-bold' : 'bg-emerald/20 text-emerald'
            }
            footL={
              <span>
                Last Jump: {lastAnalysis.metrics.hangtimeSec}s in the air • +{lastAnalysis.metrics.shoulderLeanDeg}° lean
              </span>
            }
            footR={
              <button onClick={mute} className="text-alabaster hover:text-copper underline">
                Mute Voice
              </button>
            }
            footRCls="text-sky"
          >
            <p className="text-xs text-titanium leading-relaxed mb-4">
              Never take off your gloves to type on a screen! Right after you land, just ask your phone out loud how your jump looked. Tap a question below to hear your coach answer:
            </p>
            <div className="bg-obsidian rounded-xl p-4 border border-white/10 mb-4">
              <div className="flex items-center justify-between mb-3 gap-3">
                <span className="font-mono text-[11px] text-sky">
                  {listening
                    ? '🎙️ LISTENING TO YOU...'
                    : speaking
                    ? '🔊 COACH SPEAKING...'
                    : 'TAP A QUESTION OR PUSH THE MIC BUTTON'}
                </span>
                <div className="flex items-center gap-1 h-7">
                  {[2, 3, 2, 4, 2, 3].map((h, i) => (
                    <span
                      key={i}
                      className={`w-1 bg-sky/40 rounded-full ${speaking || listening ? 'wave-active' : ''}`}
                      style={{ height: h * 4, animationDelay: `${i * 0.09}s` }}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2 text-xs font-mono min-h-[64px]">
                {riderQ === null ? (
                  <p className="text-titanium">
                    &quot;Hey Coach, did I let go of my brakes early enough on that jump?&quot;
                  </p>
                ) : (
                  <>
                    <p className="text-alabaster">🎙️ You: {riderQ}</p>
                    <p className="text-sky font-semibold mt-2">🔊 JumpXN Coach: &quot;{coachReply}&quot;</p>
                  </>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3">
              {DIALOGUES.map((d, i) => (
                <button
                  key={i}
                  onClick={() => askLiveCoach(d.rider, d.coach)}
                  className="p-3 rounded-xl bg-carbon hover:bg-white/10 border border-white/15 text-left transition"
                >
                  <span className={`font-mono text-[10px] block ${d.tone}`}>{d.label}</span>
                  <span className="text-xs text-white font-medium">{d.q}</span>
                </button>
              ))}
            </div>
            <button
              onClick={startVoiceMic}
              className="w-full py-3 rounded-xl bg-sky text-obsidian font-mono text-xs uppercase font-bold hover:opacity-90 transition"
            >
              🎙️ Tap &amp; Speak To Your Coach Out Loud
            </button>
          </Card>

          {/* POWER-UP 02: AUTO-HIGHLIGHT CUTTER + TRICK FINDER */}
          <Card
            tone="border-gold/25"
            kicker="POWER-UP 02 // AUTOMATIC HIGHLIGHT CUTTER"
            title="45 MINUTES OF FILMING → 4 PURE JUMPS"
            badge="AUTO-CUT"
            badgeCls="bg-gold/20 text-gold"
            footL={<span>No boring video editing needed</span>}
            footR="Ready for Douyin / TikTok / RedNote"
            footRCls="text-gold"
          >
            <p className="text-xs text-titanium leading-relaxed mb-4">
              Nobody wants to fast-forward through 40 minutes of walking back up the hill. Leave your phone recording and JumpXN automatically saves only the moments you fly off Pack 2.0!
            </p>
            <div className="bg-obsidian rounded-xl p-4 border border-white/10 mb-4 space-y-3">
              <div className="flex justify-between gap-2 text-[11px] font-mono">
                <span className="text-alabaster truncate">SATURDAY_SESSION.MP4 (45m 00s)</span>
                <span className="text-gold shrink-0">
                  {scanning === 'scan' ? 'FINDING JUMPS...' : '4 BEST JUMPS SAVED!'}
                </span>
              </div>
              <div className="relative h-10 bg-carbon rounded-lg border border-white/10 overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-gold/15 w-full" />
                {CLIPS.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setClip(i)}
                    className={`absolute top-1/2 -translate-y-1/2 z-10 px-2 py-1 rounded font-mono text-[10px] shadow ${
                      c.cls
                    } ${clip === i ? 'ring-2 ring-white' : ''}`}
                    style={{ left: `${6 + i * 23}%` }}
                  >
                    Jump #{i + 1}
                  </button>
                ))}
              </div>
              {clip !== null && (
                <div className="p-2.5 rounded-lg bg-carbon border border-white/10 text-xs font-mono text-alabaster/90">
                  <div className="flex items-center justify-between text-gold font-semibold">
                    <span>🎬 {CLIPS[clip].title}</span>
                    <span>⚡ {CLIPS[clip].air}</span>
                  </div>
                  <p className="text-alabaster/80 mt-0.5">{CLIPS[clip].note}</p>
                </div>
              )}
            </div>

            {/* INSTANT TRICK VIDEO FINDER */}
            <div className="bg-obsidian rounded-xl p-3.5 border border-white/10 space-y-2.5">
              <span className="font-mono text-[10px] uppercase text-gold block">
                🔍 FIND ANY JUMP IN YOUR LIBRARY BY TYPING IT:
              </span>
              <div className="flex gap-2">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='e.g. "show me clean 360s on Level 3"'
                  className="flex-1 bg-carbon border border-white/15 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-gold"
                />
                <button
                  onClick={runClipSearch}
                  className="px-3.5 py-2 rounded-lg bg-gold text-obsidian font-mono text-xs uppercase font-bold"
                >
                  Find Clips
                </button>
              </div>
              {searchResults.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {searchResults.map((r) => (
                    <div
                      key={r.id}
                      className="p-2 rounded bg-carbon border border-white/10 flex items-center justify-between text-[11px] font-mono"
                    >
                      <span className="text-white truncate">
                        🎬 {r.title} ({r.hangtime})
                      </span>
                      <span className="text-emerald shrink-0 ml-2">✓ Found!</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* POWER-UP 03: CHINA & GLOBAL SESSION RADAR */}
          <Card
            tone="border-emerald/25"
            kicker="POWER-UP 03 // PARK & WEATHER RADAR"
            title="BEST SPOTS TO RIDE & MEET FRIENDS"
            badge="CHINA & GLOBAL"
            badgeCls="bg-emerald/20 text-emerald"
            footL={<span>{SPOTS[city].weather}</span>}
            footR="+50 XP per new spot"
            footRCls="text-emerald"
          >
            <p className="text-xs text-titanium leading-relaxed mb-4">
              Got Pack 2.0 on your back? Check the weather and find the coolest skateparks, pump tracks, and bike plazas across China and the world:
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(SPOTS).map(([k, v]) => (
                <button
                  key={k}
                  onClick={() => setCity(k)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs uppercase ${
                    city === k ? 'bg-emerald text-obsidian font-bold' : 'glass-pill text-alabaster'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
            <div className="space-y-2.5">
              {SPOTS[city].list.map((s) => (
                <div
                  key={s.name}
                  className="p-3.5 rounded-xl bg-obsidian border border-white/10 flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-xs font-semibold text-white block">📍 {s.name}</span>
                    <span className="font-mono text-[11px] text-titanium">{s.surface}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald/15 text-emerald font-mono text-[10px] shrink-0">
                    PRO SPOT
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* POWER-UP 04: 3-STEP TRICK HELPER */}
          <Card
            tone="border-copper/25"
            kicker="POWER-UP 04 // INSTANT TRICK DOCTOR"
            title="TELL US WHAT TRICK YOU WANT TO LAND"
            badge="EASY 3-STEP PLAN"
            badgeCls="bg-copper/20 text-copper"
            footL={<span>Step-by-step instructions anyone can follow</span>}
            footR="Instant game plan"
            footRCls="text-copper"
          >
            <p className="text-xs text-titanium leading-relaxed mb-4">
              Nervous about your first jump or want to learn a new trick? Type what you ride below and we&apos;ll give you 3 super simple steps to land it safely:
            </p>
            <div className="space-y-3 text-xs">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={2}
                className="w-full bg-obsidian border border-white/15 rounded-xl p-3.5 text-white font-mono focus:outline-none focus:border-copper"
              />
              <button
                onClick={buildPlan}
                disabled={planLoading}
                className="w-full py-3.5 rounded-xl bg-copper hover:bg-copperHover text-white font-mono text-xs uppercase font-bold transition"
              >
                {planLoading ? 'Making Your 3 Steps...' : '✦ Show Me My 3 Easy Steps (+75 XP)'}
              </button>
              <div className="p-4 rounded-xl bg-obsidian border border-white/10 font-mono text-[11px] text-alabaster leading-relaxed min-h-[95px] whitespace-pre-line">
                {plan ||
                  `✓ YOUR 3 EASY STEPS FOR ${sport.toUpperCase()}:
1️⃣ ${lastAnalysis.skillTreeUpdate.nextThreeSendsDrill[0]}
2️⃣ ${lastAnalysis.skillTreeUpdate.nextThreeSendsDrill[1]}
3️⃣ ${lastAnalysis.skillTreeUpdate.nextThreeSendsDrill[2]}`}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
