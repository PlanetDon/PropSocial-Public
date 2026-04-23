import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TrustBadge } from "@/components/grc/trust-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatPercent } from "@/lib/utils";
import type { InvestmentOpportunity } from "@/types/investment";

export function InvestmentCard({ opportunity }: { opportunity: InvestmentOpportunity }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{opportunity.propertyName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-slate-600">
          Min investment: <strong>{formatCurrency(opportunity.minimumAmount)}</strong>
        </p>
        <p className="text-sm text-slate-600">
          Projected ROI: <strong>{formatPercent(opportunity.projectedRoiPercent)}</strong>
        </p>
        <div className="flex flex-wrap gap-2">
          <TrustBadge type="risk" riskLevel={opportunity.riskLevel} />
          {opportunity.legalVerified && <TrustBadge type="legal" />}
        </div>
        <Button asChild className="w-full gap-2">
          <Link href={`/property/${opportunity.propertyId}`}>
            Invest
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
