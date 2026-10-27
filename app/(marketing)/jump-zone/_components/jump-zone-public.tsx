'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GraduationCap, Trophy, BarChart3, Lock } from 'lucide-react';

export function JumpZonePublic() {
  return (
    <>
      <section className="relative py-32 sm:py-40 overflow-hidden bg-obsidian">
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">JUMP ZONE</p>
          <h1 className="hero-headline text-[clamp(2rem,6vw,4rem)] text-alabaster mb-4" style={{ fontFamily: 'var(--font-display)' }}>COACHING. COMMUNITY. PROGRESSION.</h1>
          <p className="text-titanium text-lg max-w-xl mx-auto mb-8">Step-by-step lessons, trick tracking, challenges and badges — all inside the Jump Zone.</p>
          <div className="flex items-center justify-center gap-2 text-titanium text-sm mb-6"><Lock size={16} /><span>Sign in to access the full Jump Zone experience</span></div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/reserve" className="bg-copper text-white px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-copperHover transition-colors" style={{ borderRadius: '12px' }}>RESERVE & GET ACCESS</Link>
            <Link href="/login" className="border border-alabaster/30 text-alabaster px-8 py-4 text-sm font-bold uppercase tracking-wider hover:border-copper hover:text-copper transition-colors" style={{ borderRadius: '12px' }}>SIGN IN</Link>
          </div>
        </div>
      </section>
      <section className="py-20 bg-obsidian">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{ icon: GraduationCap, t: 'Coaching Library', d: 'BMX, MTB, Skateboarding & Scooter lessons from beginner to advanced.' }, { icon: BarChart3, t: 'Trick Progression', d: 'Track your progress through structured skill levels.' }, { icon: Trophy, t: 'Challenges & Badges', d: 'Join community challenges and earn achievement badges.' }].map((f) => (
              <motion.div key={f.t} className="bg-carbon border border-white/5 p-8" style={{ borderRadius: '12px' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <f.icon size={32} className="text-copper mb-4" /><h3 className="text-alabaster font-bold text-lg mb-2">{f.t}</h3><p className="text-titanium text-sm leading-relaxed">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
