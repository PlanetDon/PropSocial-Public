import type { InvestmentRisk } from "@/types/investment";

export function getRiskColor(risk: InvestmentRisk): string {
  switch (risk) {
    case "low":
      return "text-emerald-600";
    case "medium":
      return "text-amber-500";
    case "high":
      return "text-red-600";
    default:
      return "text-slate-600";
  }
}

export function getRiskLabel(risk: InvestmentRisk): string {
  const map: Record<InvestmentRisk, string> = {
    low: "Low",
    medium: "Medium",
    high: "High"
  };
  return map[risk];
}
