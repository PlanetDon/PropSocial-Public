import type { ReactNode } from "react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { TopNav } from "@/components/layout/top-nav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] pb-20 md:pb-0">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
      <MobileNav />
    </div>
  );
}
