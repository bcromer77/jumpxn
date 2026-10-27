'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { IMAGES } from '@/lib/constants';
import { BadgeCheck, Eye, Vote, Share2, Mail, Sparkles, Clock, Gift, Zap, Shield } from 'lucide-react';

const benefits = [
  { icon: BadgeCheck, title: 'Founding Rider Badge', desc: 'Permanent status recognising you as part of the first wave.' },
  { icon: Sparkles, title: 'Early Coaching Access', desc: 'First to access new coaching content as it launches.' },
  { icon: Eye, title: 'Behind-the-Scenes Access', desc: 'See the development process. Manufacturing updates, prototypes, testing.' },
  { icon: Vote, title: 'Design Voting', desc: 'Have your say on colours, features and future products.' },
  { icon: Mail, title: 'Exclusive Updates', desc: 'Direct communication from the JumpXN team.' },
  { icon: Share2, title: 'Referral Link', desc: 'Share your unique link. Refer riders to JumpXN.' },
  { icon: Gift, title: 'Priority Shipping', desc: 'Founding Riders ship first when production begins.' },
  { icon: Shield, title: 'Deposit Protection', desc: 'Your $150 is fully refundable. Zero risk.' },
];

const timeline = [
  { phase: 'NOW', label: 'Reserve', desc: 'Secure your JumpPack 2.0 with a $150 refundable deposit.' },
  { phase: 'SOON', label: 'Community Access', desc: 'Jump Zone, coaching library, and challenges go live.' },
  { phase: 'NEXT', label: 'Production Updates', desc: 'Behind-the-scenes manufacturing progress.' },
  { phase: 'LAUNCH', label: 'Your Ramp Ships', desc: 'Balance payment collected. JumpPack 2.0 dispatched.' },
];

export function FoundingRidersClient() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen">
      <section className="relative py-32 sm:py-40 overflow-hidden">
        <div className="absolute inset-0"><Image src={IMAGES.foundingRiders} alt="Rider silhouette at sunset" fill className="object-cover" sizes="100vw" /><div className="absolute inset-0 bg-obsidian/85" /></div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <p className="text-copper text-xs font-bold uppercase tracking-[0.3em] mb-4">FOUNDING RIDERS</p>
          <h1 className="hero-headline text-[clamp(2rem,6vw,4rem)] text-alabaster mb-4" style={{ fontFamily: 'var(--font-display)' }}>YOU&apos;RE EARLY. THAT MATTERS.</h1>
          <p className="text-titanium text-lg max-w-xl mx-auto">Be part of the founding wave shaping the future of portable jumping.</p>
        </div>
      </section>

      <section ref={ref} className="py-20 bg-obsidian">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="text-alabaster text-xl font-bold mb-8" style={{ fontFamily: 'var(--font-display)' }}>FOUNDING RIDER BENEFITS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {benefits.map((b, i) => (
              <motion.div key={b.title} className="bg-carbon border border-white/5 p-5" style={{ borderRadius: '12px' }} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.05 }}>
                <b.icon size={22} className="text-copper mb-3" />
                <h3 className="text-alabaster font-bold text-sm mb-1">{b.title}</h3>
                <p className="text-titanium text-xs leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <h2 className="text-alabaster text-xl font-bold mb-8" style={{ fontFamily: 'var(--font-display)' }}>EXCLUSIVE ACCESS TIMELINE</h2>
          <div className="flex flex-col gap-4 mb-20">
            {timeline.map((t, i) => (
              <div key={t.phase} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-copper text-xs font-bold">{t.phase}</span>
                </div>
                <div className="flex-shrink-0 w-px bg-copper/30 self-stretch" />
                <div className="bg-carbon border border-white/5 p-4 flex-1" style={{ borderRadius: '12px' }}>
                  <h3 className="text-alabaster font-bold text-sm">{t.label}</h3>
                  <p className="text-titanium text-xs mt-1">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/reserve" className="inline-block bg-copper text-white px-10 py-4 text-sm font-bold uppercase tracking-wider hover:bg-copperHover transition-colors" style={{ borderRadius: '12px' }}>RESERVE & BECOME A FOUNDING RIDER</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
