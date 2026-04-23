export interface AuditLog {
  id: string;
  transactionId: string;
  status: "verified" | "pending" | "flagged";
  verificationHash: string;
  createdAt: string;
}

export interface EscrowRecord {
  id: string;
  propertyId: string;
  amount: number;
  status: "initiated" | "held" | "released" | "disputed";
  updatedAt: string;
}

export interface RiskExposure {
  label: string;
  level: "low" | "medium" | "high";
  detail: string;
}
