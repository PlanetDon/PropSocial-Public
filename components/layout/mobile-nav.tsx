"use client";

import Link from "next/link";
import { Home, MessageSquare, Search, UserCircle2, Wallet } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/invest", label: "Invest", icon: Wallet },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard", label: "Profile", icon: UserCircle2 }
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white p-2 md:hidden">
      <ul className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center rounded-md py-2 text-[11px] text-slate-500",
                  isActive && "bg-slate-100 text-slate-900"
                )}
              >
                <item.icon className="mb-1 size-4" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
