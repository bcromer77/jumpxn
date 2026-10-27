'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Filter, Shield, Star } from 'lucide-react';

const topRiders = [
  { rank: 1, name: 'Leo Chen (Shanghai SMP)', discipline: 'Skateboarding', region: 'CN', points: 3120, badge: 'Pro Video Verified' },
  { rank: 2, name: 'Zihao Wang (Chengdu)', discipline: 'BMX', region: 'CN', points: 2980, badge: '360 Spin Boss' },
  { rank: 3, name: 'Alex R.', discipline: 'BMX', region: 'US', points: 2840, badge: 'Pro Video Verified' },
  { rank: 4, name: 'Mei Lin (Chongli & Beijing)', discipline: 'Snowboard', region: 'CN', points: 2790, badge: 'Flat-Base Flyer' },
  { rank: 5, name: 'Mika T.', discipline: 'MTB', region: 'EU', points: 2650, badge: 'No-Brake Boss' },
  { rank: 6, name: 'Kai Zhang (Shenzhen Bay)', discipline: 'Scooter', region: 'CN', points: 2590, badge: 'Tailwhip Hero' },
  { rank: 7, name: 'Jordan K.', discipline: 'BMX', region: 'UK', points: 2510, badge: 'Pro Video Verified' },
  { rank: 8, name: 'Casey L.', discipline: 'Scooter', region: 'AU', points: 2200, badge: 'Level 3 Sender' },
];

export function LeaderboardClient() {
  const [discFilter, setDiscFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');

  const filtered = topRiders.filter(
    (r) => (discFilter === 'All' || r.discipline === discFilter) && (regionFilter === 'All' || r.region === regionFilter)
  );

  return (
    <div className="min-h-screen">
      <section className="relative py-32 sm:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/img/jx-c10b.jpg" alt="Aerial view of pump track" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-obsidian/85" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <p className="text-copper text-xs font-bold uppercase tracking-[0.3em] mb-4">GLOBAL &amp; CHINA RANKINGS</p>
          <h1 className="hero-headline text-[clamp(2rem,6vw,4rem)] text-alabaster mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            TOP PLAYERS IN THE WORLD
          </h1>
          <p className="text-titanium text-lg max-w-xl mx-auto">
            Upload your jump clips, beat Skill Tree levels, and climb the rankings with your friends!
          </p>
        </div>
      </section>

      <section className="py-16 bg-carbon">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="bg-obsidian border border-white/10 px-4 py-3 mb-8 flex items-center gap-2 text-xs text-titanium rounded-xl">
            <Shield size={14} className="text-emerald" />
            <span>Every jump clip is checked by our Slow-Mo Replay Studio so rankings stay 100% fair and fun!</span>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <Filter size={14} className="text-titanium" />
              <span className="text-xs text-titanium">Ride:</span>
              {['All', 'BMX', 'MTB', 'Skateboarding', 'Snowboard', 'Scooter'].map((d) => (
                <button
                  key={d}
                  onClick={() => setDiscFilter(d)}
                  className={`px-3 py-1 text-xs font-bold uppercase rounded-xl ${
                    discFilter === d ? 'bg-copper text-white' : 'border border-white/10 text-titanium'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-titanium">Region:</span>
              {['All', 'CN', 'US', 'UK', 'EU', 'AU'].map((r) => (
                <button
                  key={r}
                  onClick={() => setRegionFilter(r)}
                  className={`px-3 py-1 text-xs font-bold uppercase rounded-xl ${
                    regionFilter === r ? 'bg-copper text-white' : 'border border-white/10 text-titanium'
                  }`}
                >
                  {r === 'CN' ? '🇨🇳 China' : r}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-obsidian border border-white/10 overflow-hidden rounded-2xl">
            <div className="grid grid-cols-[60px_1fr_130px_80px_100px_160px] gap-2 px-6 py-3 border-b border-white/10 text-xs font-bold text-titanium uppercase hidden sm:grid">
              <span>Rank</span>
              <span>Player</span>
              <span>Ride</span>
              <span>Region</span>
              <span>XP</span>
              <span>Badge</span>
            </div>
            {filtered.map((r, i) => (
              <motion.div
                key={r.rank}
                className="grid grid-cols-1 sm:grid-cols-[60px_1fr_130px_80px_100px_160px] gap-2 px-6 py-4 border-b border-white/5 last:border-0 items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="text-copper font-bold text-lg">#{r.rank}</span>
                <span className="text-alabaster font-bold flex items-center gap-2">
                  <Star size={14} className={r.rank <= 3 ? 'text-gold' : 'text-titanium/30'} />
                  {r.name}
                </span>
                <span className="text-sm text-titanium">{r.discipline}</span>
                <span className="text-sm text-titanium">{r.region}</span>
                <span className="text-sm text-emerald font-bold">{r.points.toLocaleString('en-US')} XP</span>
                <span className="text-xs font-bold text-gold">{r.badge}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
