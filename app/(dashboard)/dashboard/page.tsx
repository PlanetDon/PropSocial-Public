import { ComplianceStatus } from "@/components/grc/compliance-status";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockPortfolio } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import type { ComplianceProfile } from "@/types/user";

const mockCompliance: ComplianceProfile = {
  kycStatus: "verified",
  amlStatus: "cleared",
  transactionMonitoringEnabled: true,
  lastCheckedAt: "2026-04-23T08:00:00.000Z"
};

export default function DashboardPage() {
  const totalInvestment = mockPortfolio.reduce((sum, item) => sum + item.amountInvested, 0);
  const estimatedReturns = Math.round(totalInvestment * 0.128);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Investment dashboard</h1>
        <p className="text-sm text-slate-600">Track portfolio performance and trust posture in one place.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total portfolio</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-slate-900">{formatCurrency(totalInvestment)}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Estimated returns</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-emerald-600">
            +{formatCurrency(estimatedReturns)}
          </CardContent>
        </Card>
        <ComplianceStatus compliance={mockCompliance} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Active investments</h2>
        <div className="grid gap-3">
          {mockPortfolio.map((position) => (
            <Card key={position.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-2 pt-4">
                <div>
                  <p className="font-medium text-slate-900">{position.propertyName}</p>
                  <p className="text-sm text-slate-600">{formatCurrency(position.amountInvested)} invested</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">ROI</p>
                  <p className="font-semibold text-slate-900">{position.projectedRoiPercent}%</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
