import type { AuditLog, EscrowRecord, RiskExposure } from "@/types/grc";
import type { InvestmentOpportunity, PortfolioPosition } from "@/types/investment";
import type { Property } from "@/types/property";

export const mockProperties: Property[] = [
  {
    id: "prop-001",
    title: "Luxury Apartment - Eko Atlantic",
    location: "Lagos, Nigeria",
    price: 120000000,
    imageUrl:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviewCount: 214,
    investmentEnabled: true,
    compliance: {
      verifiedOwnership: true,
      escrowProtected: true,
      legalDocsAvailable: true,
      riskLevel: "medium"
    },
    aiInsight: "Price is 8% above market median in this district."
  },
  {
    id: "prop-002",
    title: "4-Bed Duplex - Lekki Phase 1",
    location: "Lekki, Lagos",
    price: 95000000,
    imageUrl:
      "https://images.unsplash.com/photo-1430285561322-7808604715df?auto=format&fit=crop&w=1200&q=80",
    rating: 4.5,
    reviewCount: 133,
    investmentEnabled: true,
    compliance: {
      verifiedOwnership: true,
      escrowProtected: true,
      legalDocsAvailable: true,
      riskLevel: "low"
    },
    aiInsight: "Appears in two listing catalogs; duplicate review completed."
  },
  {
    id: "prop-003",
    title: "Commercial Towers - Victoria Island",
    location: "Victoria Island, Lagos",
    price: 280000000,
    imageUrl:
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=80",
    rating: 4.4,
    reviewCount: 98,
    investmentEnabled: false,
    compliance: {
      verifiedOwnership: true,
      escrowProtected: false,
      legalDocsAvailable: true,
      riskLevel: "high"
    },
    aiInsight: "Escrow not enabled yet; legal review still active."
  }
];

export const mockOpportunities: InvestmentOpportunity[] = [
  {
    id: "inv-001",
    propertyId: "prop-001",
    propertyName: "Luxury Apartment - Eko Atlantic",
    minimumAmount: 5000,
    projectedRoiPercent: 18,
    riskLevel: "medium",
    legalVerified: true
  },
  {
    id: "inv-002",
    propertyId: "prop-002",
    propertyName: "4-Bed Duplex - Lekki Phase 1",
    minimumAmount: 10000,
    projectedRoiPercent: 15,
    riskLevel: "low",
    legalVerified: true
  }
];

export const mockPortfolio: PortfolioPosition[] = [
  {
    id: "port-001",
    propertyName: "Luxury Apartment - Eko Atlantic",
    amountInvested: 50000,
    projectedRoiPercent: 16,
    status: "active"
  },
  {
    id: "port-002",
    propertyName: "4-Bed Duplex - Lekki Phase 1",
    amountInvested: 120000,
    projectedRoiPercent: 13,
    status: "active"
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: "aud-001",
    transactionId: "txn-001",
    status: "verified",
    verificationHash: "0x8f6e5f2acb1798d15bb9238f443ea2f9",
    createdAt: "2026-04-22T13:42:00.000Z"
  },
  {
    id: "aud-002",
    transactionId: "txn-002",
    status: "pending",
    verificationHash: "0x5ce64bc2b6a85b2d1fd7d2458fd16d67",
    createdAt: "2026-04-21T10:11:00.000Z"
  }
];

export const mockEscrowRecords: EscrowRecord[] = [
  {
    id: "esc-001",
    propertyId: "prop-001",
    amount: 5000000,
    status: "held",
    updatedAt: "2026-04-22T09:10:00.000Z"
  },
  {
    id: "esc-002",
    propertyId: "prop-002",
    amount: 2200000,
    status: "released",
    updatedAt: "2026-04-20T15:02:00.000Z"
  }
];

export const mockRiskExposure: RiskExposure[] = [
  {
    label: "Listing anomaly risk",
    level: "medium",
    detail: "Two properties require ownership revalidation."
  },
  {
    label: "Escrow dispute risk",
    level: "low",
    detail: "No current disputes in active escrow accounts."
  }
];
