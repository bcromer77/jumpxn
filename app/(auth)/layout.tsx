import { SiteHeader } from '@/components/site-header';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[calc(100vh-6rem)] py-12 bg-obsidian flex items-center justify-center">{children}</main>
    </>
  );
}
