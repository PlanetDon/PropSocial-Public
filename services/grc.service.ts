import { apiClient } from "@/lib/api";
import { mockAuditLogs, mockEscrowRecords, mockRiskExposure } from "@/lib/mock-data";
import type { AuditLog, EscrowRecord, RiskExposure } from "@/types/grc";

export async function fetchAuditLogs(): Promise<AuditLog[]> {
  try {
    return await apiClient<AuditLog[]>("/grc/audit-logs", { authRequired: true });
  } catch {
    return mockAuditLogs;
  }
}

export async function fetchEscrowRecords(): Promise<EscrowRecord[]> {
  try {
    return await apiClient<EscrowRecord[]>("/grc/escrow-records", { authRequired: true });
  } catch {
    return mockEscrowRecords;
  }
}

export async function fetchRiskExposure(): Promise<RiskExposure[]> {
  try {
    return await apiClient<RiskExposure[]>("/grc/risk-exposure", { authRequired: true });
  } catch {
    return mockRiskExposure;
  }
}
