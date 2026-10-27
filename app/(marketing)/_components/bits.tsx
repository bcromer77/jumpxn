'use client';
import Image from 'next/image';
import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

export const IMG = {
  dirtMountains: '/img/jx-c6b.jpg',
  bmxSky: '/img/jx-c1a.jpg',
  bmxFlip: '/img/jx-c1b.jpg',
  bmxForest: '/img/jx-c2.jpg',
  mtbForest: '/img/jx-c2b.jpg',
  skateBowl: '/img/jx-c3.jpg',
  scooterPark: '/img/jx-c4.jpg',
  bmxSunset: '/img/jx-c5.jpg',
  mtbTrail: '/img/jx-c6.jpg',
  bmxRamp: '/img/jx-c7.jpg',
  bmxSunset2: '/img/jx-c7b.jpg',
  skateWheel: '/img/jx-c8.jpg',
  mtbFork: '/img/jx-c9.jpg',
  pumpTrack: '/img/jx-c10b.jpg',
  kidPump: '/img/jx-c11.jpg',
  snowAlpine: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=2000&q=85',
};

export function Photo({ src, alt, className = '', priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 1024px) 100vw, 66vw"
      className={`object-cover object-center ${className}`}
      onError={() => console.error(`Image failed to load: ${src}`)}
    />
  );
}

export function Tag({ children, tone = 'titanium' }: { children: ReactNode; tone?: 'titanium' | 'gold' | 'copper' }) {
  const c = tone === 'gold' ? 'text-gold border-gold/40' : tone === 'copper' ? 'text-copper border-copper/40' : 'text-titanium border-white/20';
  return <span className={`inline-block font-mono text-[9px] uppercase tracking-wider border rounded px-1.5 py-0.5 ${c}`}>{children}</span>;
}

export function Modal({ open, onClose, children, wide = false }: { open: boolean; onClose: () => void; children: ReactNode; wide?: boolean }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-obsidian/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div
        className={`glass-panel rounded-2xl w-full ${wide ? 'max-w-3xl' : 'max-w-md'} p-6 sm:p-8 relative my-8 border border-white/20`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-20">
          <X size={16} />
        </button>
        {children}
      </div>
    </div>
  );
}

export function ExportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose}>
      <h3 className="font-display font-black text-2xl uppercase text-white mb-1">9:16 PRO VS. ME HIGHLIGHT CARD</h3>
      <p className="font-mono text-[10px] uppercase text-titanium mb-3">Split-screen comparison • Ready for Reels & TikTok</p>
      <div className="rounded-xl overflow-hidden border border-white/20 aspect-[9/13] flex flex-col">
        <div className="relative h-1/2 border-b-2 border-copper p-3 flex items-end">
          <Photo src={IMG.bmxSunset} alt="World Champion Demo" className="brightness-75" />
          <span className="relative z-10 font-mono text-[10px] bg-obsidian/80 px-2 py-0.5 rounded text-gold">WORLD CHAMP DEMO • SYNCED</span>
        </div>
        <div className="relative h-1/2 p-3 flex items-end">
          <Photo src={IMG.bmxSky} alt="Your send against the sky" className="brightness-75" />
          <span className="relative z-10 font-mono text-[10px] bg-copper px-2 py-0.5 rounded text-white">MY SEND • 0.89s HANGTIME</span>
        </div>
      </div>
    </Modal>
  );
}
