'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { usePlayer } from '@/components/providers';
import { ExportModal } from './bits';

const SOCIALS = [
  { id: 'dy', name: 'DOUYIN / TIKTOK', tone: 'text-copper', ph: '@your_douyin_or_tiktok' },
  { id: 'xhs', name: 'XIAOHONGSHU / IG', tone: 'text-gold', ph: '@your_rednote_or_ig' },
];

export function Giveaway() {
  const { addXp } = usePlayer();
  const [handles, setHandles] = useState<Record<string, string>>({ dy: '', xhs: '' });
  const [linked, setLinked] = useState<Record<string, boolean>>({});
  const [exportOpen, setExportOpen] = useState(false);
  const entries = Object.values(linked).filter(Boolean).length * 25;

  const connect = (id: string) => {
    if (linked[id]) return;
    const h = handles[id].trim();
    if (h.length < 2) {
      toast.error('Type your account name first!');
      return;
    }
    setLinked((l) => ({ ...l, [id]: true }));
    addXp(100, 'Connected Social Channel (+25 Prize Entries)');
  };

  return (
    <section id="giveaway" className="scroll-mt-24 py-24 bg-carbon border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 font-mono text-xs uppercase tracking-widest text-gold">
            ★ SEASON 01 PRIZE DROP • WIN A FREE PACK 2.0 RAMP
          </div>
          <h2 className="font-display font-black uppercase text-5xl sm:text-6xl text-white leading-none">
            POST YOUR JUMP CLIPS.<br />WIN A FREE PACK 2.0.
          </h2>
          <p className="text-sm text-titanium max-w-2xl leading-relaxed">
            Connect your <strong className="text-white">Douyin, Xiaohongshu (RedNote), TikTok, or Instagram</strong> below to get +25 bonus prize entries and unlock the 9:16 <strong className="text-white">Pro vs. Me</strong> split-screen video maker!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {SOCIALS.map((s) => (
              <div key={s.id} className="glass-panel p-5 rounded-xl flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className={`font-mono text-[10px] uppercase block ${s.tone}`}>+25 PRIZE ENTRIES</span>
                  <h4 className="font-display font-bold text-2xl uppercase text-white">{s.name}</h4>
                  <input
                    value={handles[s.id]}
                    onChange={(e) => setHandles((h) => ({ ...h, [s.id]: e.target.value }))}
                    disabled={linked[s.id]}
                    placeholder={s.ph}
                    className="mt-2 bg-obsidian border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white font-mono w-full max-w-[11rem] focus:outline-none focus:border-copper disabled:opacity-60"
                  />
                </div>
                <button
                  onClick={() => connect(s.id)}
                  className={`px-4 py-2.5 rounded-lg font-mono text-xs uppercase font-semibold shrink-0 ${
                    linked[s.id] ? 'bg-emerald text-obsidian' : 'bg-white text-obsidian hover:bg-alabaster'
                  }`}
                >
                  {linked[s.id] ? '✓ Linked' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold block">YOUR PLAYER LOCKER</span>
              <h3 className="font-display font-bold text-3xl uppercase text-white mt-0.5">FOUNDING PLAYER PASS</h3>
            </div>
            <div className="text-right">
              <span className="font-display font-black text-5xl text-copper leading-none">{entries}</span>
              <span className="font-mono text-[10px] uppercase text-titanium block">Prize Entries</span>
            </div>
          </div>
          <button
            onClick={() => setExportOpen(true)}
            className="w-full py-4 rounded-xl bg-white text-obsidian hover:bg-alabaster font-semibold text-xs uppercase tracking-widest transition"
          >
            Open 9:16 &quot;Pro vs. Me&quot; Video Maker →
          </button>
        </div>
      </div>
      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} />
    </section>
  );
}
