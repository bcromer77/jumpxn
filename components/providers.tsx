'use client';
import { SessionProvider } from 'next-auth/react';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import { SAMPLE_ANALYSES, type Real2SeeAnalysis } from '@/lib/gemini-schemas';

export const CURRENCIES = {
  USD: { symbol: '$', rate: 1, label: 'US$ (USD)' },
  CNY: { symbol: '¥', rate: 7.2, label: '¥ (CNY / RMB)' },
  EUR: { symbol: '€', rate: 0.92, label: '€ (EUR)' },
  GBP: { symbol: '£', rate: 0.79, label: '£ (GBP)' },
  AUD: { symbol: 'A$', rate: 1.52, label: 'A$ (AUD)' },
  CAD: { symbol: 'C$', rate: 1.36, label: 'C$ (CAD)' },
} as const;
export type CurrencyCode = keyof typeof CURRENCIES;
export type SportKey = 'bmx' | 'mtb' | 'skate' | 'snow' | 'scoot';

type PlayerCtx = {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  price: (usd: number) => string;
  xp: number;
  addXp: (amount: number, reason: string) => void;
  sport: SportKey;
  setSport: (s: SportKey, announce?: boolean) => void;
  lastAnalysis: Real2SeeAnalysis;
  setLastAnalysis: (a: Real2SeeAnalysis) => void;
  aiUnlockedMissions: Record<string, boolean>;
  unlockMissionByAi: (missionId: string) => void;
};

const Ctx = createContext<PlayerCtx | null>(null);

export function usePlayer() {
  const c = useContext(Ctx);
  if (!c) throw new Error('usePlayer must be used inside Providers');
  return c;
}

function PlayerProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');
  const [xp, setXp] = useState(1450);
  const [sport, setSportState] = useState<SportKey>('mtb');
  const [lastAnalysis, setLastAnalysisState] = useState<Real2SeeAnalysis>(SAMPLE_ANALYSES.mtb);
  const [aiUnlockedMissions, setAiUnlockedMissions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const c = localStorage.getItem('jxn-currency') as CurrencyCode | null;
      if (c && c in CURRENCIES) setCurrencyState(c);
      const x = Number(localStorage.getItem('jxn-xp') ?? 1450);
      if (Number.isFinite(x) && x > 0) setXp(x);
    } catch (e) {
      console.error('Failed to read player prefs', e);
    }
  }, []);

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c);
    try { localStorage.setItem('jxn-currency', c); } catch (e) { console.error(e); }
    toast(`Prices switched to ${c}!`);
  }, []);

  const price = useCallback(
    (usd: number) => {
      const c = CURRENCIES[currency];
      return `${c.symbol}${Math.round(usd * c.rate)}`;
    },
    [currency]
  );

  const addXp = useCallback((amount: number, reason: string) => {
    setXp((prev) => {
      const next = prev + amount;
      try { localStorage.setItem('jxn-xp', String(next)); } catch (e) { console.error(e); }
      return next;
    });
    toast(`⚡ +${amount} XP — ${reason}`);
  }, []);

  const setSport = useCallback((s: SportKey, announce = false) => {
    setSportState(s);
    setLastAnalysisState(SAMPLE_ANALYSES[s] || SAMPLE_ANALYSES.mtb);
    if (announce) {
      addXp(50, `Switched Ride to ${s.toUpperCase()}!`);
    }
  }, [addXp]);

  const setLastAnalysis = useCallback((a: Real2SeeAnalysis) => {
    setLastAnalysisState(a);
  }, []);

  const unlockMissionByAi = useCallback((missionId: string) => {
    setAiUnlockedMissions((prev) => ({ ...prev, [missionId]: true }));
  }, []);

  return (
    <Ctx.Provider
      value={{
        currency,
        setCurrency,
        price,
        xp,
        addXp,
        sport,
        setSport,
        lastAnalysis,
        setLastAnalysis,
        aiUnlockedMissions,
        unlockMissionByAi,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <PlayerProvider>{children}</PlayerProvider>
    </SessionProvider>
  );
}
