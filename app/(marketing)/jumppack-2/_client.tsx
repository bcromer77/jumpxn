'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bike, Shield, Ruler, Weight, Layers, Wifi, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { usePlayer } from '@/components/providers';

const specs = [
  { label: 'Carry Style', value: 'Folds Flat With Padded Backpack Straps', icon: Weight },
  { label: 'Setup Speed', value: 'Under 15 Seconds — 3 Clicks, Zero Tools', icon: Ruler },
  { label: 'Height Settings', value: '3 Levels: Level 1 (Starter), Level 2 (Medium), Level 3 (Pro Air)', icon: Ruler },
  { label: 'Ramp Curve', value: 'Philip McIntosh Smooth-Lift Curve (Zero Back-Wheel Kick)', icon: Layers },
  { label: 'Ground Grip', value: 'Non-Slip Rubber Pads for Concrete, Tarmac, Grass & Dirt', icon: Shield },
  { label: 'Works With', value: 'BMX, Mountain Bike, Skateboard & Pro Scooter', icon: Bike },
  { label: 'App Included', value: 'JumpXN Slow-Mo Replay Studio + Voice Coach + Trick Levels', icon: Wifi },
];

const faqs = [
  { q: 'How easy is it to carry Pack 2.0?', a: 'Super easy! It folds flat into its own backpack straps so you can ride your bike, skateboard, or scooter straight to the park with both hands free.' },
  { q: 'How fast can I set it up?', a: 'About 15 seconds! You don’t need any tools or screws. Just unclip the latches, unfold the ramp, click the legs into Level 1, 2, or 3, and start jumping.' },
  { q: 'What can I ride on it?', a: 'BMX bikes, Mountain Bikes, Skateboards, and Pro Scooters! The bottom edge sits super flat on the ground so even small skateboard and scooter wheels roll on smoothly.' },
  { q: 'How does the phone app help me land tricks?', a: 'Prop your phone up to film your jump! The app automatically clips your jump in super slow-motion, shows your flight line, and talks to you through your earbuds with easy tips.' },
  { q: 'What if I change my mind after reserving?', a: 'Your deposit is 100% refundable with one click inside your Player Locker anytime before your ramp ships. Zero risk!' },
];

export function JumpPack2Client() {
  const { price } = usePlayer();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <section className="relative py-32 sm:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/img/jx-c7.jpg" alt="BMX rider launching off Pack 2.0" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-obsidian/80" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <p className="text-copper text-xs font-bold uppercase tracking-[0.3em] mb-4">WEAR IT • UNFOLD IT • FLY</p>
          <h1 className="hero-headline text-[clamp(2rem,6vw,4.5rem)] text-alabaster mb-4" style={{ fontFamily: 'var(--font-display)' }}>PACK 2.0 LAUNCH RAMP</h1>
          <p className="text-titanium text-lg max-w-xl mx-auto">The backpack that turns any driveway, park, or plaza into your personal jump arena in 15 seconds.</p>
        </div>
      </section>

      <section ref={ref} className="py-24 bg-obsidian">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-carbon border border-white/10" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
              <Image src="/img/jx-c2b.jpg" alt="Pack 2.0 in action" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </motion.div>
            <div>
              <h2 className="text-alabaster text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>3 CLICKS AND YOU ARE READY TO FLY.</h2>
              <p className="text-titanium leading-relaxed mb-6">Wear it on your back, unfold it in 15 seconds with zero tools, and pick from 3 height levels as your confidence grows. Whether you ride BMX, MTB, Skateboard, or Scooter, Pack 2.0 gives you a smooth, safe lift every time.</p>
              <div className="grid grid-cols-2 gap-3">
                {['🚲 BMX Bikes', '🚵 Mountain Bikes', '🛹 Skateboards', '🛴 Pro Scooters'].map((d) => (
                  <div key={d} className="bg-carbon border border-white/10 px-4 py-3 text-sm text-alabaster font-medium rounded-xl">
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-alabaster text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>BUILT FOR REAL RIDERS</h2>
            <div className="bg-carbon border border-white/10 overflow-hidden rounded-2xl">
              {specs.map((s, i) => (
                <div key={s.label} className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-6 py-4 ${i < specs.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <div className="flex items-center gap-3 sm:w-56 flex-shrink-0">
                    <s.icon size={18} className="text-copper flex-shrink-0" />
                    <span className="text-sm text-titanium">{s.label}</span>
                  </div>
                  <span className="text-sm text-alabaster font-medium">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-alabaster text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>EASY ANSWERS TO YOUR QUESTIONS</h2>
            <div className="flex flex-col gap-2">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-carbon border border-white/10 rounded-xl">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left">
                    <span className="text-sm font-medium text-alabaster">{faq.q}</span>
                    <ChevronDown size={18} className={`text-titanium transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && <div className="px-6 pb-4 text-sm text-titanium leading-relaxed">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-carbon border border-gold/20 p-6 mb-20 rounded-xl">
            <h3 className="text-gold text-sm font-bold uppercase tracking-wider mb-2">Always Gear Up!</h3>
            <p className="text-titanium text-sm leading-relaxed">Always wear a certified helmet, gloves, and pads. Start on Level 1 height and set up on flat ground with plenty of clear landing space.</p>
          </div>

          <div className="text-center">
            <Link href="/reserve" className="inline-block bg-copper text-white px-10 py-4 text-sm font-bold uppercase tracking-wider hover:bg-copperHover transition-colors rounded-xl">
              RESERVE YOUR PACK 2.0 — {price(150)}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
