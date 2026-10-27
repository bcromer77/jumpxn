'use client';
import { usePlayer, type SportKey } from '@/components/providers';
import { IMG, Photo } from './bits';

const SPORTS: {
  key: SportKey;
  badge: string;
  badgeCls: string;
  sub: string;
  subTone: string;
  title: string;
  desc: string;
  cta: string;
  ctaTone: string;
  borderHover: string;
  img: string;
}[] = [
  {
    key: 'bmx',
    badge: '20" BMX BIKES',
    badgeCls: 'bg-copper text-white',
    sub: 'STREET • PARK • DIRT',
    subTone: 'text-gold',
    title: 'BMX FLIGHT',
    desc: 'Turn any flat driveway, park, or street spot into your personal jump arena. Learn bunny-hops, tabletops, and clean 180 & 360 spins!',
    cta: 'Play BMX 360 Spin Game →',
    ctaTone: 'text-copper',
    borderHover: 'hover:border-copper',
    img: IMG.bmxSky,
  },
  {
    key: 'mtb',
    badge: 'MOUNTAIN BIKES',
    badgeCls: 'bg-gold text-obsidian',
    sub: 'TRAILS • PARKS • BACKYARD',
    subTone: 'text-gold',
    title: 'MOUNTAIN BIKE',
    desc: 'Learn the 3-bike-length brake secret, push with your legs for effortless air, and land smoothly on both wheels every single time.',
    cta: 'Play MTB Brake Game →',
    ctaTone: 'text-gold',
    borderHover: 'hover:border-gold',
    img: IMG.dirtMountains,
  },
  {
    key: 'skate',
    badge: 'SMOOTH ROLL-ON',
    badgeCls: 'bg-emerald text-obsidian',
    sub: 'PLAZA • PARK • DRIVEWAY',
    subTone: 'text-emerald',
    title: 'SKATEBOARD',
    desc: 'Super-smooth bottom edge built for small wheels! Learn the +16° shoulder lean so your board stays glued to your shoes in the air.',
    cta: 'Play Skate Lean Game →',
    ctaTone: 'text-emerald',
    borderHover: 'hover:border-emerald',
    img: IMG.skateBowl,
  },
  {
    key: 'snow',
    badge: 'SNOW & DRY-SLOPE',
    badgeCls: 'bg-sky text-obsidian',
    sub: 'MOUNTAIN & INDOOR DOMES',
    subTone: 'text-sky',
    title: 'SNOWBOARD',
    desc: 'Keep the bottom of your snowboard flat on the jump so you never catch an edge, and pop off both feet for awesome grabs!',
    cta: 'Play Snowboard Game →',
    ctaTone: 'text-sky',
    borderHover: 'hover:border-sky',
    img: IMG.snowAlpine,
  },
  {
    key: 'scoot',
    badge: 'PARK & STREET',
    badgeCls: 'bg-white text-obsidian',
    sub: 'ALL SKILL LEVELS',
    subTone: 'text-alabaster/70',
    title: 'PRO SCOOTER',
    desc: 'Keep your handlebars straight on take-off, unlock your first tailwhips and barspins, and stomp clean two-foot landings!',
    cta: 'Play Scooter Missions →',
    ctaTone: 'text-white',
    borderHover: 'hover:border-white',
    img: IMG.scooterPark,
  },
];

export function Arenas() {
  const { sport, setSport } = usePlayer();

  const handleSelect = (k: SportKey) => {
    setSport(k, true);
    const el = document.getElementById('cheatcodes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="arenas" className="py-24 max-w-[1440px] mx-auto px-5 md:px-10 scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold block mb-2">
            01 // PICK YOUR RIDE • UNLOCK YOUR SUPERPOWERS
          </span>
          <h2 className="font-display font-black uppercase text-5xl sm:text-6xl text-white leading-none">
            FIVE WAYS TO FLY. ONE BACKPACK.
          </h2>
        </div>
        <p className="text-sm text-titanium max-w-md leading-relaxed">
          Tap what you ride below! Each card loads your sport&apos;s interactive trick game, slow-motion replay studio, and step-by-step pro missions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {SPORTS.map((s) => {
          const isActive = sport === s.key;
          return (
            <div
              key={s.key}
              onClick={() => handleSelect(s.key)}
              className={`photo-card h-[420px] p-6 flex flex-col justify-between cursor-pointer group border-2 transition-all ${
                isActive ? 'border-copper ring-2 ring-copper/40' : `border-transparent ${s.borderHover}`
              }`}
            >
              <Photo src={s.img} alt={s.title} className="bg-photo brightness-[0.72]" />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/35 to-transparent" />
              <div className="relative z-10 flex justify-between items-center">
                <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] uppercase font-bold ${s.badgeCls}`}>
                  {s.badge}
                </span>
                <span className="font-mono text-[10px] text-alabaster/80">
                  {isActive ? '● SELECTED' : '+50 XP'}
                </span>
              </div>
              <div className="relative z-10 space-y-2">
                <span className={`font-mono text-[10px] uppercase tracking-widest block ${s.subTone}`}>
                  {s.sub}
                </span>
                <h3 className="font-display font-black text-3xl uppercase text-white leading-none">
                  {s.title}
                </h3>
                <p className="text-xs text-alabaster/85 leading-relaxed">{s.desc}</p>
                <span className={`inline-block pt-1 font-mono text-[11px] group-hover:translate-x-1 transition-transform ${s.ctaTone}`}>
                  {s.cta}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
