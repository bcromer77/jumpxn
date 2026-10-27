'use client';
import { motion } from 'framer-motion';
import { SAMPLE_CHALLENGES } from '@/lib/constants';
import { Trophy, Users, Calendar, Target, AlertCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'sonner';

const diffColor = (d: string) => d === 'Beginner' ? 'text-copper' : d === 'Intermediate' ? 'text-gold' : d === 'Advanced' ? 'text-red-400' : 'text-titanium';

export function ChallengesClient() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen">
      <section className="py-32 sm:py-40 bg-obsidian text-center">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <p className="text-copper text-xs font-bold uppercase tracking-[0.3em] mb-4">CHALLENGES</p>
          <h1 className="hero-headline text-[clamp(2rem,6vw,4rem)] text-alabaster mb-4" style={{ fontFamily: 'var(--font-display)' }}>PUSH YOUR LIMITS</h1>
          <p className="text-titanium text-lg max-w-xl mx-auto">Join community challenges, earn badges, and track your progress against fellow riders.</p>
        </div>
      </section>

      <section className="py-16 bg-carbon">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="bg-obsidian border border-white/5 px-4 py-3 mb-8 flex items-center gap-2 text-sm text-titanium" style={{ borderRadius: '12px' }}>
            <AlertCircle size={16} /><span>SAMPLE DATA — Illustrative challenges only. No real participant counts.</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_CHALLENGES.map((ch, i) => (
              <motion.div key={ch.id} className="bg-obsidian border border-white/5 p-6 hover:border-copper/20 transition-colors" style={{ borderRadius: '12px' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-titanium">{ch.discipline}</span>
                  <span className={`text-xs font-bold ${diffColor(ch.difficulty)}`}>{ch.difficulty}</span>
                </div>
                <h3 className="text-alabaster font-bold text-lg mb-2">{ch.title}</h3>
                <p className="text-titanium text-sm leading-relaxed mb-4">{ch.description}</p>
                <div className="flex items-center gap-4 text-xs text-titanium mb-4">
                  <span className="flex items-center gap-1"><Users size={12} />{(i + 2) * 8} riders (sample)</span>
                  <span className="flex items-center gap-1"><Trophy size={12} />{ch.rewardBadge}</span>
                </div>
                {session?.user ? (
                  <button onClick={() => toast.success('Challenge joined! (Demo)')} className="w-full bg-copper/10 text-copper py-2 text-xs font-bold uppercase tracking-wider hover:bg-copper/20 transition-colors" style={{ borderRadius: '12px' }}>JOIN CHALLENGE</button>
                ) : (
                  <Link href="/login" className="block w-full bg-copper/10 text-copper py-2 text-xs font-bold uppercase tracking-wider text-center hover:bg-copper/20 transition-colors" style={{ borderRadius: '12px' }}>SIGN IN TO JOIN</Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
