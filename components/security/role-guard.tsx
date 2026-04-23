"use client";

import type { ReactNode } from "react";
import { hasRequiredRole } from "@/lib/auth";
import { useUserStore } from "@/store/user-store";
import type { UserRole } from "@/types/user";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  fallback?: ReactNode;
  children: ReactNode;
}

export function RoleGuard({
  allowedRoles,
  fallback = <p className="text-sm text-slate-600">You do not have access to this section.</p>,
  children
}: RoleGuardProps) {
  const user = useUserStore((state) => state.user);
  if (!user || !hasRequiredRole(user.role, allowedRoles)) return <>{fallback}</>;
  return <>{children}</>;
}
