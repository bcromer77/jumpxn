'use client';
import { Users, CreditCard, BadgeCheck, HeadphonesIcon, AlertCircle, Download, XCircle, Globe } from 'lucide-react';
import { SafeDate } from '@/components/safe-format';

interface Stats {
  users: number;
  reservations: number;
  foundingRiders: number;
  supportRequests: number;
  depositRevenue: number;
  cancelled: number;
  countryDistribution: { country: string; count: number }[];
}

interface Reservation {
  id: string;
  referenceCode: string;
  status: string;
  depositPaid: boolean;
  country: string;
  createdAt: string;
  userEmail: string;
  userName: string;
}

export function AdminClient({ stats, recentReservations }: { stats: Stats; recentReservations: Reservation[] }) {
  const handleExport = () => {
    const headers = 'Reference,Email,Name,Status,Deposit,Country,Date\n';
    const rows = (recentReservations ?? []).map((r: Reservation) =>
      `${r.referenceCode},${r.userEmail},${r.userName},${r.status},${r.depositPaid ? 'Paid' : 'Pending'},${r.country},${r.createdAt}`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'reservations.csv'; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-obsidian min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="hero-headline text-[clamp(1.5rem,3vw,2.5rem)] text-alabaster" style={{ fontFamily: 'var(--font-display)' }}>ADMIN DASHBOARD</h1>
          <button onClick={handleExport} className="bg-copper text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-copperHover transition-colors flex items-center gap-2" style={{ borderRadius: '12px' }}><Download size={14} /> EXPORT CSV</button>
        </div>

        <div className="bg-carbon border border-white/5 px-4 py-2 mb-6 flex items-center gap-2 text-xs text-titanium" style={{ borderRadius: '12px' }}>
          <AlertCircle size={14} />Data shown is from the live database. Sample/test data is labelled where applicable.
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { icon: Users, label: 'Users', val: stats.users, color: 'text-copper' },
            { icon: CreditCard, label: 'Reservations', val: stats.reservations, color: 'text-copper' },
            { icon: BadgeCheck, label: 'Founding Riders', val: stats.foundingRiders, color: 'text-copper' },
            { icon: CreditCard, label: 'Deposit Revenue', val: `$${(stats.depositRevenue ?? 0).toLocaleString('en-US')}`, color: 'text-copper' },
            { icon: XCircle, label: 'Cancelled', val: stats.cancelled, color: 'text-gold' },
            { icon: HeadphonesIcon, label: 'Support', val: stats.supportRequests, color: 'text-titanium' },
          ].map((s) => (
            <div key={s.label} className="bg-carbon border border-white/5 p-4" style={{ borderRadius: '12px' }}>
              <s.icon size={18} className={`${s.color} mb-2`} />
              <p className={`text-xl font-bold ${s.color}`}>{s.val}</p>
              <p className="text-xs text-titanium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Country Distribution */}
        {(stats.countryDistribution?.length ?? 0) > 0 && (
          <div className="bg-carbon border border-white/5 p-6 mb-8" style={{ borderRadius: '12px' }}>
            <h3 className="text-alabaster font-bold mb-4 flex items-center gap-2"><Globe size={18} className="text-copper" /> Country Distribution</h3>
            <div className="flex flex-wrap gap-3">
              {(stats.countryDistribution ?? []).map((c: any) => (
                <div key={c.country} className="bg-obsidian px-4 py-2" style={{ borderRadius: '12px' }}>
                  <span className="text-sm font-bold text-alabaster">{c.country}</span>
                  <span className="text-sm text-titanium ml-2">{c.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Reservations Table */}
        <div className="bg-carbon border border-white/5 overflow-hidden" style={{ borderRadius: '12px' }}>
          <div className="px-6 py-4 border-b border-white/5"><h3 className="text-alabaster font-bold">Recent Reservations</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-white/5 text-xs text-titanium uppercase">
                <th className="px-4 py-3 text-left">Reference</th><th className="px-4 py-3 text-left">Email</th><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-left">Deposit</th><th className="px-4 py-3 text-left">Country</th><th className="px-4 py-3 text-left">Date</th>
              </tr></thead>
              <tbody>
                {(recentReservations ?? []).map((r: Reservation) => (
                  <tr key={r.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 text-sm font-mono text-copper">{r.referenceCode}</td>
                    <td className="px-4 py-3 text-sm text-titanium">{r.userEmail}</td>
                    <td className="px-4 py-3 text-sm text-alabaster">{r.status}</td>
                    <td className="px-4 py-3 text-sm">{r.depositPaid ? <span className="text-copper">Paid</span> : <span className="text-titanium">Pending</span>}</td>
                    <td className="px-4 py-3 text-sm text-titanium">{r.country}</td>
                    <td className="px-4 py-3 text-sm text-titanium"><SafeDate date={r.createdAt} options={{ dateStyle: 'medium' }} /></td>
                  </tr>
                ))}
                {(recentReservations?.length ?? 0) === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-titanium">No reservations yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
