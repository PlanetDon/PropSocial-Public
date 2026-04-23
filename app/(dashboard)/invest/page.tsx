"use client";

import { useMemo } from "react";
import { InvestmentCard } from "@/components/investment/investment-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInvestments } from "@/hooks/use-investments";
import { useInvestmentStore } from "@/store/investment-store";

export default function InvestPage() {
  const { opportunitiesQuery } = useInvestments();
  const { selectedAmount, setSelectedAmount } = useInvestmentStore();

  const projectedShare = useMemo(() => Math.max((selectedAmount / 5_000_000) * 100, 0.01), [selectedAmount]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Investments</h1>
        <p className="text-sm text-slate-600">Fractional investment with escrow and compliance controls.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Investment simulator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <label htmlFor="amount" className="text-sm font-medium text-slate-700">
            Select amount (NGN)
          </label>
          <input
            id="amount"
            type="range"
            min={5000}
            max={500000}
            step={5000}
            value={selectedAmount}
            onChange={(event) => setSelectedAmount(Number(event.target.value))}
            className="w-full"
          />
          <p className="text-sm text-slate-600">
            Amount: <strong>{selectedAmount.toLocaleString("en-NG")}</strong> | Ownership estimate:{" "}
            <strong>{projectedShare.toFixed(2)}%</strong>
          </p>
          <Button>Proceed to escrow confirmation</Button>
        </CardContent>
      </Card>

      <section className="grid gap-4 md:grid-cols-2">
        {opportunitiesQuery.data?.map((opportunity) => (
          <InvestmentCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </section>
    </div>
  );
}
