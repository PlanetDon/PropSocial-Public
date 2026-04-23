import { notFound } from "next/navigation";
import { AiInsightPanel } from "@/components/ai/ai-insight-panel";
import { TrustBadge } from "@/components/grc/trust-badge";
import { InvestmentCard } from "@/components/investment/investment-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockOpportunities } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { fetchPropertyById } from "@/services/property.service";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailsPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = await fetchPropertyById(id);

  if (!property) notFound();

  const opportunities = mockOpportunities.filter((item) => item.propertyId === property.id);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <section className="space-y-4 lg:col-span-2">
        <header className="space-y-1">
          <p className="text-sm uppercase tracking-wide text-slate-500">Property details</p>
          <h1 className="text-3xl font-bold text-slate-900">{property.title}</h1>
          <p className="text-lg text-slate-700">{formatCurrency(property.price)}</p>
          <p className="text-sm text-slate-600">{property.location}</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Trust panel</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {property.compliance.verifiedOwnership && <TrustBadge type="verified" />}
            {property.compliance.escrowProtected && <TrustBadge type="escrow" />}
            {property.compliance.legalDocsAvailable && <TrustBadge type="legal" />}
            <TrustBadge type="risk" riskLevel={property.compliance.riskLevel} />
          </CardContent>
        </Card>

        <AiInsightPanel insights={[property.aiInsight ?? "No anomaly detected.", "Transaction checks pass current policy."]} />

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button>Chat agent</Button>
            <Button variant="secondary">Book inspection</Button>
            <Button variant="secondary">Request documents</Button>
          </CardContent>
        </Card>
      </section>

      <aside className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Investment options</h2>
        {opportunities.length > 0 ? (
          opportunities.map((opportunity) => <InvestmentCard key={opportunity.id} opportunity={opportunity} />)
        ) : (
          <Card>
            <CardContent className="pt-4 text-sm text-slate-600">
              Fractional investment is not enabled for this property yet.
            </CardContent>
          </Card>
        )}
      </aside>
    </div>
  );
}
