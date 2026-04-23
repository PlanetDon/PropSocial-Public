"use client";

import { useQuery } from "@tanstack/react-query";
import { mockOpportunities, mockPortfolio } from "@/lib/mock-data";
import type { InvestmentOpportunity, PortfolioPosition } from "@/types/investment";

export function useInvestments() {
  const opportunitiesQuery = useQuery<InvestmentOpportunity[]>({
    queryKey: ["investments", "opportunities"],
    queryFn: async () => mockOpportunities
  });

  const portfolioQuery = useQuery<PortfolioPosition[]>({
    queryKey: ["investments", "portfolio"],
    queryFn: async () => mockPortfolio
  });

  return { opportunitiesQuery, portfolioQuery };
}
