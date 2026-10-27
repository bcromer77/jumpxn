'use client';
import Link from 'next/link';
import { User, CreditCard, BadgeCheck, Trophy, GraduationCap, Settings, Copy, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { SafeDate } from '@/components/safe-format';

interface Props {
  userName: string;
  reservation: { referenceCode: string; status: string; depositPaid: boolean; createdAt: string } | null;
  isFoundingRider: boolean;
  referralCode: string | null;
  achievementCount: number;
}

export function DashboardClient({ userName, reservation, isFoundingRider, referralCode, achievementCount }: Props) {
  return (
    <div className="bg-obsidian min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <h1 className="hero-headline text-[clamp(1.5rem,3vw,2.5rem)] text-alabaster mb-8" style={{ fontFamily: 'var(--font-display)' }}>YOUR DASHBOARD</h1>

        {/* Profile */}
        <div className="bg-carbon border border-white/5 p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{ borderRadius: '12px' }}>
          <div className="w-14 h-14 bg-copper/10 flex items-center justify-center rounded-full"><User size={28} className="text-copper" /></div>
          <div className="flex-1">
            <h2 className="text-alabaster font-bold text-lg">{userName}</h2>
            <p className="text-titanium text-sm">{isFoundingRider ? 'Founding Rider' : 'JumpXN Member'}</p>
          </div>
          {isFoundingRider && <div className="bg-copper/10 px-3 py-1 text-xs text-copper font-bold uppercase flex items-center gap-1" style={{ borderRadius: '12px' }}><BadgeCheck size={14} /> Founding Rider</div>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reservation */}
          <div className="lg:col-span-2">
            <div className="bg-carbon border border-white/5 p-6" style={{ borderRadius: '12px' }}>
              <h3 className="text-alabaster font-bold mb-4 flex items-center gap-2"><CreditCard size={18} className="text-copper" /> Reservation Status</h3>
              {reservation ? (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><p className="text-xs text-titanium">Reference</p><p className="text-sm font-mono text-copper flex items-center gap-1">{reservation.referenceCode}<button onClick={() => { navigator.clipboard?.writeText?.(reservation.referenceCode); toast.success('Copied!'); }}><Copy size={12} className="text-titanium" /></button></p></div>
                    <div><p className="text-xs text-titanium">Status</p><p className="text-sm text-alabaster font-bold">{reservation.status}</p></div>
                    <div><p className="text-xs text-titanium">Deposit</p><p className="text-sm text-alabaster">{reservation.depositPaid ? '$150 Paid' : 'Pending'}</p></div>
                    <div><p className="text-xs text-titanium">Reserved</p><p className="text-sm text-alabaster"><SafeDate date={reservation.createdAt} options={{ dateStyle: 'medium' }} /></p></div>
                  </div>
                  <div className="bg-obsidian p-3 text-xs text-titanium" style={{ borderRadius: '12px' }}>Balance of $499 becomes payable when your unit is ready to ship.</div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-titanium text-sm mb-4">No active reservation yet.</p>
                  <Link href="/reserve" className="bg-copper text-white px-6 py-2 text-sm font-bold uppercase hover:bg-copperHover transition-colors" style={{ borderRadius: '12px' }}>RESERVE NOW</Link>
                </div>
              )}
            </div>
          </div>

          {/* Side cards */}
          <div className="flex flex-col gap-6">
            <div className="bg-carbon border border-white/5 p-6" style={{ borderRadius: '12px' }}>
              <h3 className="text-alabaster font-bold mb-3 flex items-center gap-2"><Trophy size={18} className="text-copper" /> Achievements</h3>
              <p className="text-3xl font-bold text-copper">{achievementCount}</p>
              <p className="text-xs text-titanium">badges earned</p>
            </div>
            <div className="bg-carbon border border-white/5 p-6" style={{ borderRadius: '12px' }}>
              <h3 className="text-alabaster font-bold mb-3 flex items-center gap-2"><GraduationCap size={18} className="text-copper" /> Coaching</h3>
              <Link href="/jump-zone" className="text-sm text-copper hover:underline">Go to Jump Zone →</Link>
            </div>
            {referralCode && (
              <div className="bg-carbon border border-white/5 p-6" style={{ borderRadius: '12px' }}>
                <h3 className="text-alabaster font-bold mb-3 flex items-center gap-2"><BadgeCheck size={18} className="text-copper" /> Referral</h3>
                <p className="text-xs text-titanium mb-2">Your referral code:</p>
                <p className="text-sm font-mono text-copper flex items-center gap-1">{referralCode}<button onClick={() => { navigator.clipboard?.writeText?.(referralCode ?? ''); toast.success('Copied!'); }}><Copy size={12} className="text-titanium" /></button></p>
              </div>
            )}
          </div>
        </div>

        {/* Production updates */}
        <div className="mt-6 bg-carbon border border-white/5 p-6" style={{ borderRadius: '12px' }}>
          <h3 className="text-alabaster font-bold mb-4 flex items-center gap-2"><Clock size={18} className="text-copper" /> Production Updates</h3>
          <div className="flex flex-col gap-3">
            {[{ date: 'Coming soon', text: 'Manufacturing partner selection in progress.' }, { date: 'Coming soon', text: 'Final prototype testing underway.' }].map((u, i) => (
              <div key={i} className="bg-obsidian p-4 flex items-start gap-3" style={{ borderRadius: '12px' }}>
                <span className="text-xs text-copper font-bold flex-shrink-0 w-24">{u.date}</span>
                <span className="text-sm text-titanium">{u.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
