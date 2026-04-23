export type PropertyRisk = "low" | "medium" | "high";

export interface PropertyCompliance {
  verifiedOwnership: boolean;
  escrowProtected: boolean;
  legalDocsAvailable: boolean;
  riskLevel: PropertyRisk;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
  rating: number;
  investmentEnabled: boolean;
  reviewCount: number;
  compliance: PropertyCompliance;
  aiInsight?: string;
}
