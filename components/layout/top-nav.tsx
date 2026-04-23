"use client";

import Link from "next/link";
import { Bell, Globe, MessageSquare, Search, UserCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { APP_NAME, SUPPORTED_REGIONS } from "@/lib/constants";

const MODES = ["Buy", "Rent", "Lease", "Invest"] as const;

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight text-[--color-primary-900]">
          {APP_NAME}
        </Link>

        <div className="relative hidden flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input className="pl-9" placeholder="Smart search: location, budget, property type" />
        </div>

        <select
          className="hidden rounded-md border border-slate-300 bg-white px-2 py-2 text-sm text-slate-700 md:block"
          aria-label="Region selector"
          defaultValue={SUPPORTED_REGIONS[0].code}
        >
          {SUPPORTED_REGIONS.map((region) => (
            <option key={region.code} value={region.code}>
              {region.label}
            </option>
          ))}
        </select>

        <select
          className="hidden rounded-md border border-slate-300 bg-white px-2 py-2 text-sm text-slate-700 md:block"
          aria-label="Mode selector"
          defaultValue="Buy"
        >
          {MODES.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>

        <div className="ml-auto flex items-center gap-1">
          <Link href="/messages" className="rounded-md p-2 hover:bg-slate-100" aria-label="Messages">
            <MessageSquare className="size-4 text-slate-700" />
          </Link>
          <button className="rounded-md p-2 hover:bg-slate-100" aria-label="Notifications">
            <Bell className="size-4 text-slate-700" />
          </button>
          <button className="rounded-md p-2 hover:bg-slate-100 md:hidden" aria-label="Regions">
            <Globe className="size-4 text-slate-700" />
          </button>
          <Link href="/dashboard" className="rounded-md p-2 hover:bg-slate-100" aria-label="Profile">
            <UserCircle2 className="size-5 text-slate-700" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
