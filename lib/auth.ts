import { jwtDecode } from "jwt-decode";
import type { User, UserRole } from "@/types/user";

interface AccessTokenPayload {
  sub: string;
  email: string;
  fullName: string;
  role: UserRole;
  region: string;
  currency: string;
  exp: number;
}

export function parseUserFromToken(token?: string | null): User | null {
  if (!token) return null;

  try {
    const payload = jwtDecode<AccessTokenPayload>(token);
    const isExpired = payload.exp * 1000 < Date.now();
    if (isExpired) return null;

    return {
      id: payload.sub,
      email: payload.email,
      fullName: payload.fullName,
      role: payload.role,
      region: payload.region,
      currency: payload.currency,
      compliance: {
        kycStatus: "verified",
        amlStatus: "cleared",
        transactionMonitoringEnabled: true,
        lastCheckedAt: new Date().toISOString()
      }
    };
  } catch {
    return null;
  }
}

export function hasRequiredRole(role: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(role);
}
