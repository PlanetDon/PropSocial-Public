export type InvestmentRisk = "low" | "medium" | "high";
export type InvestmentStatus = "active" | "pending" | "closed";

export interface InvestmentOpportunity {
  id: string;
  propertyId: string;
  propertyName: string;
  minimumAmount: number;
  projectedRoiPercent: number;
  riskLevel: InvestmentRisk;
  legalVerified: boolean;
}

export interface PortfolioPosition {
  id: string;
  propertyName: string;
  amountInvested: number;
  projectedRoiPercent: number;
  status: InvestmentStatus;
}
