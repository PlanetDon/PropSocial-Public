import Link from "next/link";
import { ActivityFeed } from "@/components/social/activity-feed";
import { InvestmentCard } from "@/components/investment/investment-card";
import { PropertyGrid } from "@/components/property/property-grid";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockOpportunities, mockProperties } from "@/lib/mock-data";

const trustMetrics = [
  { label: "Verified listings", value: "2,400+" },
  { label: "Escrow volume secured", value: "NGN 3.2B" },
  { label: "Fraud cases prevented", value: "1,200" }
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-[--color-primary-900] p-6 text-white sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-blue-200">Secure property platform</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
          Find, verify and invest in property with confidence.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-blue-100 sm:text-base">
          PropSocial combines secure workflows, escrow controls, and realtime intelligence into one
          financial-grade frontend.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/search">Start discovery</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/grc">View trust dashboard</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {trustMetrics.map((metric) => (
          <Card key={metric.label} className="space-y-1 border-slate-200 p-4">
            <p className="text-2xl font-bold text-[--color-primary-900]">{metric.value}</p>
            <p className="text-sm text-slate-600">{metric.label}</p>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Featured properties</h2>
          <Link href="/search" className="text-sm font-medium text-[--color-primary-700] hover:underline">
            View all
          </Link>
        </div>
        <PropertyGrid properties={mockProperties} />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          <h2 className="text-xl font-semibold text-slate-900">Invest from NGN 5,000</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {mockOpportunities.map((opportunity) => (
              <InvestmentCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        </div>
        <ActivityFeed />
      </section>
    </div>
  );
}
