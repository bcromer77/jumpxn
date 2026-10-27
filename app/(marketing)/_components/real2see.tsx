'use client';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { usePlayer, type SportKey } from '@/components/providers';
import { ExportModal, IMG, Photo } from './bits';

const REPLAY_SPORTS: Record<SportKey, { label: string; img: string }> = {
  mtb: { label: '🚵 MTB', img: IMG.dirtMountains },
  bmx: { label: '🚲 BMX', img: IMG.bmxFlip },
  skate: { label: '🛹 Skate', img: IMG.skateBowl },
  snow: { label: '🏂 Snow', img: IMG.snowAlpine },
  scoot: { label: '🛴 Scoot', img: IMG.scooterPark },
};

const MAGIC_PRESETS = [
  'Slow down my jump 3x and draw my flight line in glowing neon',
  'Show my first try vs. my best jump side-by-side in super slow-mo',
  'Make a vertical 9:16 highlight clip for Douyin, TikTok & Xiaohongshu',
];

function phaseFor(pct: number) {
  if (pct < 0.2) return 'STEP 1: ROLL IN SMOOTH & FINGERS OFF BRAKES';
  if (pct < 0.4) return 'STEP 2: PUSH WITH YOUR LEGS AT THE LIP';
  if (pct < 0.75) return 'STEP 3: FLOATING IN MID-AIR!';
  return 'STEP 4: BEND KNEES & STOMP THE LANDING!';
}

export function Real2See() {
  const { addXp, sport, setSport, lastAnalysis, setLastAnalysis, unlockMissionByAi } = usePlayer();
  const [val, setVal] = useState(52);
  const [ghost, setGhost] = useState(true);
  const [showArc, setShowArc] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string | null>(null);
  const [locked, setLocked] = useState(true);
  const [exportOpen, setExportOpen] = useState(false);
  const [showStatsCard, setShowStatsCard] = useState(false);
  const [magicPrompt, setMagicPrompt] = useState(MAGIC_PRESETS[0]);
  const [magicSummary, setMagicSummary] = useState<string | null>(null);
  const [magicLoading, setMagicLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const activeSport = REPLAY_SPORTS[sport] || REPLAY_SPORTS.mtb;
  const pct = val / 100;
  const frame = Math.round(110 + pct * 115);
  const x = Math.round(310 + pct * (835 - 310));
  const y = Math.round(415 - Math.sin(pct * Math.PI) * 210 + pct * 105);

  const runMagicJumpCheck = async (file?: File) => {
    if (scanning) return;
    setScanning(true);
    setScanStep('STEP 1: Finding the exact moment you hit the ramp...');

    let videoBase64: string | undefined;
    let videoMimeType = 'video/mp4';

    if (file) {
      videoMimeType = file.type || 'video/mp4';
      const buf = await file.arrayBuffer();
      const bytes = new Uint8Array(buf);
      let binary = '';
      for (let i = 0; i < Math.min(bytes.byteLength, 3 * 1024 * 1024); i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      videoBase64 = typeof btoa !== 'undefined' ? btoa(binary) : undefined;
    }

    setTimeout(() => {
      setScanStep('STEP 2: Zooming in with super slow-motion to check your body position...');
    }, 650);

    try {
      const res = await fetch('/api/ai/real2see', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sport,
          videoBase64,
          videoMimeType,
          riderNote: file ? `Uploaded clip: ${file.name}` : 'Session clip',
        }),
      });
      const data = await res.json();
      setTimeout(() => {
        setScanning(false);
        setScanStep(null);
        setLocked(true);
        if (data?.analysis) {
          setLastAnalysis(data.analysis);
          unlockMissionByAi(data.analysis.skillTreeUpdate.missionIdUnlocked);
          addXp(
            data.analysis.skillTreeUpdate.xpAwarded || 250,
            `Jump Checked! Unlocked: ${data.analysis.skillTreeUpdate.badgeEarned || 'Next Trick Level'}`
          );
        }
      }, 1300);
    } catch {
      setScanning(false);
      setScanStep(null);
      toast.error('Could not check video right now.');
    }
  };

  const runMagicHighlightEdit = async (cmd?: string) => {
    const commandToRun = cmd || magicPrompt;
    setMagicPrompt(commandToRun);
    setMagicLoading(true);
    try {
      const res = await fetch('/api/ai/omni-flash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'edit', sport, command: commandToRun }),
      });
      const data = await res.json();
      if (data?.appliedEdit) {
        setMagicSummary('Boom! Your slow-mo highlight is ready with your glowing flight line.');
        setShowArc(data.appliedEdit.trajectoryArcOverlay);
        if (data.appliedEdit.ghostComparisonOverlay) setGhost(true);
        addXp(75, 'Created Magic Slow-Mo Highlight!');
      }
    } catch {
      toast.error('Highlight maker busy — try again!');
    }
    setMagicLoading(false);
  };

  return (
    <section id="real2see" className="py-24 bg-carbon border-y border-white/10 scroll-mt-24">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-sky/10 border border-sky/30 font-mono text-[10px] uppercase tracking-widest text-sky mb-3">
              <span>04 // SUPER SLOW-MO REPLAY STUDIO</span>
              <span>•</span>
              <span>SEE YOUR FLIGHT PATH LIKE A VIDEO GAME</span>
            </div>
            <h2 className="font-display font-black uppercase text-5xl sm:text-6xl text-white leading-none">
              WATCH YOURSELF FLY IN SUPER SLOW-MO.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(REPLAY_SPORTS) as SportKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setSport(k, false)}
                className={`px-3.5 py-2 rounded-xl font-mono text-xs transition ${
                  sport === k ? 'bg-copper text-white font-bold' : 'glass-pill text-white hover:border-white/40'
                }`}
              >
                {REPLAY_SPORTS[k].label}
              </button>
            ))}
            <input
              ref={fileRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) runMagicJumpCheck(f);
              }}
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="px-4 py-2 rounded-xl bg-white text-obsidian font-mono text-xs uppercase font-bold hover:bg-alabaster transition"
            >
              📹 Upload My Jump Video
            </button>
            <button
              onClick={() => runMagicJumpCheck()}
              className="px-4 py-2 rounded-xl bg-sky text-obsidian font-mono text-xs uppercase font-bold hover:opacity-90 transition shadow-lg shadow-sky/20"
            >
              ✦ Check My Jump Now
            </button>
            <button
              onClick={() => setGhost(!ghost)}
              className="px-3.5 py-2 rounded-xl glass-pill font-mono text-xs uppercase text-white hover:border-white/40 transition"
            >
              {ghost ? '✓' : '○'} Compare Try #1 vs Best
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 flex flex-col gap-5">
            <div className="photo-card min-h-[500px] flex flex-col justify-between p-6 sm:p-8">
              <Photo
                key={activeSport.img}
                src={activeSport.img}
                alt={`${activeSport.label} replay viewport`}
                className="brightness-[0.65] contrast-[1.15]"
              />
              {scanning && (
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-sky/30 to-sky/80 border-b-2 border-sky pointer-events-none er-scan-beam z-20" />
              )}

              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 1000 620"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <linearGradient id="arcGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E8501E" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#D4A359" stopOpacity="1" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <g>
                  <polygon points="110,520 310,520 310,415" fill="rgba(232,80,30,0.2)" stroke="#E8501E" strokeWidth="2" />
                  <line
                    x1="100"
                    y1="520"
                    x2="900"
                    y2="520"
                    stroke="rgba(244,243,239,0.22)"
                    strokeDasharray="6 6"
                    strokeWidth="1.5"
                  />
                  <text x="115" y="542" fill="#F4F3EF" fontFamily="var(--font-mono)" fontSize="11">
                    PACK 2.0 RAMP LOCKED IN • SUPER SLOW-MO FLIGHT VIEW
                  </text>
                </g>
                {ghost && (
                  <g opacity="0.55">
                    <path
                      d="M 310 415 Q 520 230 760 520"
                      fill="none"
                      stroke="#8F96A0"
                      strokeWidth="2.5"
                      strokeDasharray="8 6"
                    />
                    <circle cx="520" cy="322" r="6" fill="#8F96A0" />
                    <text x="455" y="305" fill="#8F96A0" fontFamily="var(--font-mono)" fontSize="11">
                      FIRST TRY (PULLED UP TOO EARLY)
                    </text>
                  </g>
                )}
                {showArc && (
                  <g>
                    <path d="M 310 415 Q 545 95 835 520" fill="none" stroke="url(#arcGrad)" strokeWidth="4" />
                    <circle cx="310" cy="415" r="8" fill="#E8501E" stroke="#F4F3EF" strokeWidth="2" />
                    <text x="205" y="395" fill="#E8501E" fontFamily="var(--font-mono)" fontWeight="600" fontSize="12">
                      TAKE-OFF!
                    </text>
                    <g transform={`translate(${x}, ${y})`}>
                      <line x1="-28" y1="24" x2="0" y2="0" stroke="#F4F3EF" strokeWidth="2.5" />
                      <line x1="0" y1="0" x2="22" y2="-28" stroke="#F4F3EF" strokeWidth="2.5" />
                      <line x1="22" y1="-28" x2="48" y2="-10" stroke="#D4A359" strokeWidth="2.5" />
                      <circle cx="28" cy="-42" r="9" fill="none" stroke="#D4A359" strokeWidth="2.5" />
                      <circle cx="0" cy="0" r="9" fill="#D4A359" stroke="#060708" strokeWidth="2.5" />
                      {locked && (
                        <g>
                          <rect
                            x="-68"
                            y="-56"
                            width="155"
                            height="96"
                            fill="rgba(56,189,248,0.08)"
                            stroke="#38BDF8"
                            strokeWidth="1.8"
                            strokeDasharray="4 2"
                          />
                          <rect x="-68" y="-74" width="210" height="18" fill="#38BDF8" />
                          <text x="-62" y="-61" fill="#060708" fontFamily="var(--font-mono)" fontWeight="700" fontSize="10">
                            {lastAnalysis.biomechanics.status} • LEAN +{lastAnalysis.metrics.shoulderLeanDeg}°
                          </text>
                          <rect
                            x="28"
                            y="2"
                            width="64"
                            height="54"
                            fill="rgba(16,185,129,0.10)"
                            stroke="#10B981"
                            strokeWidth="1.5"
                          />
                          <text x="28" y="68" fill="#10B981" fontFamily="var(--font-mono)" fontSize="9">
                            SCORE: {lastAnalysis.metrics.landingQualityScore}/100
                          </text>
                        </g>
                      )}
                    </g>
                    <circle cx="835" cy="520" r="8" fill="#10B981" stroke="#F4F3EF" strokeWidth="2" />
                    <text x="705" y="500" fill="#10B981" fontFamily="var(--font-mono)" fontWeight="600" fontSize="12">
                      STOMPED LANDING!
                    </text>
                  </g>
                )}
              </svg>

              <div className="relative z-20 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-obsidian/85 border border-white/15 font-mono text-[11px] text-white">
                  SLOW-MO FRAME: <strong className="text-gold">{String(frame).padStart(4, '0')}</strong> / 0240
                </span>
                <span className="px-3 py-1 rounded-full bg-obsidian/90 border border-sky/40 font-mono text-[11px] text-sky">
                  {scanStep || '✓ JUMP TRACKER LOCKED ON RIDER'}
                </span>
              </div>

              <div className="relative z-20 glass-panel rounded-xl p-4 mt-auto">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-titanium mb-2">
                  <span>DRAG SLIDER TO MOVE THROUGH YOUR JUMP IN SLOW MOTION</span>
                  <span className="text-gold font-semibold">{phaseFor(pct)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={val}
                  onChange={(e) => setVal(Number(e.target.value))}
                  className="w-full cursor-pointer h-2"
                  style={{ accentColor: '#E8501E' }}
                  aria-label="Replay scrubber"
                />
                <div className="flex justify-between text-[10px] font-mono text-titanium mt-1.5">
                  <span>1. ROLL IN</span>
                  <span className="text-copper">2. POP OFF THE LIP</span>
                  <span className="text-gold">3. HIGHEST POINT</span>
                  <span className="text-emerald">4. SMOOTH LANDING</span>
                </div>
              </div>
            </div>

            {/* MAGIC HIGHLIGHT MAKER BAR */}
            <div className="glass-panel rounded-2xl p-5 border border-gold/30">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold">
                  ✦ MAGIC HIGHLIGHT MAKER // TYPE WHAT YOU WANT YOUR VIDEO TO LOOK LIKE
                </span>
                <span className="font-mono text-[10px] text-emerald">DOUYIN • TIKTOK • XIAOHONGSHU READY</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  value={magicPrompt}
                  onChange={(e) => setMagicPrompt(e.target.value)}
                  placeholder="Tell the studio how to style your jump clip..."
                  className="flex-1 bg-obsidian border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-gold"
                />
                <button
                  onClick={() => runMagicHighlightEdit()}
                  disabled={magicLoading}
                  className="px-5 py-2.5 rounded-xl bg-gold text-obsidian font-mono text-xs uppercase font-bold hover:opacity-90 transition shrink-0"
                >
                  {magicLoading ? 'Making Clip...' : 'Make My Highlight →'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2.5">
                {MAGIC_PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => runMagicHighlightEdit(p)}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-obsidian/80 border border-white/10 text-titanium hover:text-white hover:border-gold/40 transition"
                  >
                    &ldquo;{p}&rdquo;
                  </button>
                ))}
              </div>
              {magicSummary && (
                <p className="mt-3 text-xs font-mono text-emerald bg-obsidian/80 border border-emerald/30 rounded-lg px-3 py-2">
                  ✓ {magicSummary}
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold">
                  YOUR JUMP SCORE CARD
                </span>
                <button
                  onClick={() => setShowStatsCard(!showStatsCard)}
                  className="font-mono text-[10px] text-sky underline hover:text-white"
                >
                  {showStatsCard ? 'Simple View' : 'Pro Numbers'}
                </button>
              </div>
              <h3 className="font-display font-bold text-3xl uppercase text-white mt-1">
                {sport.toUpperCase()} // WHY THIS JUMP WAS AWESOME
              </h3>

              {showStatsCard ? (
                <div className="mt-4 p-4 rounded-xl bg-obsidian border border-white/10 space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-titanium">Take-Off Time:</span>
                    <span className="text-white">{lastAnalysis.sendWindow.lipLaunchSec}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-titanium">Highest Point:</span>
                    <span className="text-gold">{lastAnalysis.sendWindow.peakFloatSec}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-titanium">Landing Time:</span>
                    <span className="text-emerald">{lastAnalysis.sendWindow.touchdownSec}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-titanium">Slow-Mo Speed:</span>
                    <span className="text-sky">{lastAnalysis.sendWindow.samplingFps} Frames/Sec</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2">
                    <span className="text-titanium">Badge Unlocked:</span>
                    <span className="text-copper font-bold">{lastAnalysis.skillTreeUpdate.badgeEarned}</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="p-3.5 rounded-xl bg-obsidian/80 border border-white/10">
                      <span className="text-[11px] text-titanium block">Air Time</span>
                      <span className="font-display font-bold text-3xl text-white">
                        {lastAnalysis.metrics.hangtimeSec}s
                      </span>
                      <span className="font-mono text-[10px] text-emerald block mt-0.5">+24% BIGGER AIR!</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-obsidian/80 border border-white/10">
                      <span className="text-[11px] text-titanium block">Jump Height</span>
                      <span className="font-display font-bold text-3xl text-white">
                        {lastAnalysis.metrics.estimatedBoostMeters}m
                      </span>
                      <span className="font-mono text-[10px] text-gold block mt-0.5">
                        SCORE: {lastAnalysis.metrics.landingQualityScore}/100
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-obsidian/80 border border-white/10">
                      <span className="text-[10px] font-mono text-titanium block">BRAKE CHECK</span>
                      <span className="font-mono text-xs text-emerald font-bold">
                        Let Go {lastAnalysis.metrics.brakeReleaseBikeLengths} Lengths Early!
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-obsidian/80 border border-white/10">
                      <span className="text-[10px] font-mono text-titanium block">BODY POSITION</span>
                      <span className="font-mono text-xs text-gold font-bold">
                        +{lastAnalysis.metrics.shoulderLeanDeg}° Sweet Spot!
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-copper/10 border border-copper/30 mt-4">
                    <span className="font-mono text-[10px] uppercase text-copper block mb-1">
                      💡 THE SECRET YOU UNLOCKED:
                    </span>
                    <p className="text-xs text-alabaster leading-relaxed">
                      {lastAnalysis.biomechanics.proSecretUnlocked}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald/10 border border-emerald/30 mt-3">
                    <span className="font-mono text-[10px] uppercase text-emerald block mb-1">
                      🎯 YOUR NEXT 3 JUMPS GAME PLAN:
                    </span>
                    <ul className="text-[11px] font-mono text-alabaster/90 space-y-1">
                      {lastAnalysis.skillTreeUpdate.nextThreeSendsDrill.map((d, i) => (
                        <li key={i}>• {d}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setExportOpen(true)}
              className="w-full py-3.5 rounded-xl bg-copper hover:bg-copperHover text-white font-mono text-xs uppercase font-semibold transition"
            >
              Share 9:16 &quot;Pro vs. Me&quot; Clip (Douyin / TikTok / RedNote) →
            </button>
          </div>
        </div>
      </div>
      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} />
    </section>
  );
}
