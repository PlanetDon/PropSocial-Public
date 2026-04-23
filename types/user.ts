export type UserRole = "user" | "agent" | "admin";

export type KycStatus = "pending" | "verified" | "rejected";
export type AmlStatus = "pending" | "cleared" | "flagged";

export interface ComplianceProfile {
  kycStatus: KycStatus;
  amlStatus: AmlStatus;
  transactionMonitoringEnabled: boolean;
  lastCheckedAt: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  region: string;
  currency: string;
  compliance: ComplianceProfile;
}
