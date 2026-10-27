import Link from 'next/link';
import { Logo } from '@/components/site-header';

export function SiteFooter() {
  return (
    <footer className="bg-obsidian border-t border-white/10 py-12 text-xs text-titanium">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Logo small />
          <span className="font-display font-bold text-lg uppercase text-white">JUMPXN. GO BIGGER. KNOW BETTER.</span>
        </div>
        <nav className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-wider">
          <Link href="/jumppack-2" className="hover:text-white transition">Pack 2.0</Link>
          <Link href="/jump-zone" className="hover:text-white transition">Jump Zone</Link>
          <Link href="/support" className="hover:text-white transition">Support</Link>
        </nav>
        <div className="font-mono text-[11px] text-center md:text-right">
          © 2026 JUMPXN & PHILIP MCINTOSH • REFUNDABLE FOUNDING PASS
        </div>
      </div>
    </footer>
  );
}
