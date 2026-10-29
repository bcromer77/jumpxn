import { Barlow_Condensed, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler';
import { Providers } from '@/components/providers';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', weight: ['300', '400', '500', '600', '700'] });
const barlow = Barlow_Condensed({ subsets: ['latin'], variable: '--font-display', weight: ['600', '700', '800', '900'], style: ['normal', 'italic'] });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:3000'),
  title: {
    default: 'JumpXN — Pack 2.0 | Backpack To Flight In 15 Seconds',
    template: '%s | JumpXN',
  },
  description: 'JumpPack 2.0 — The portable folding jump ramp + REAL2SEE 240fps telemetry studio.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'JumpXN — Backpack To Flight In 15 Seconds.',
    description: 'JumpPack 2.0 — The portable folding jump ramp for BMX, MTB, Skateboarding, Snowboard and Scooter.',
    images: ['/og-image.png'],
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${barlow.variable} ${mono.variable} font-sans bg-obsidian text-alabaster`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Providers>
            {children}
            <Toaster />
            <ChunkLoadErrorHandler />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
