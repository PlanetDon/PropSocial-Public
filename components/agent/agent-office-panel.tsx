import { BadgeCheck, Building2, MapPin, ShieldCheck, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AgentProfile } from "@/services/agent.service";

export function AgentOfficePanel({ agent }: { agent: AgentProfile }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="size-5 text-[--color-primary-700]" />
          {agent.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-slate-700">{agent.company}</p>
        <div className="flex flex-wrap gap-2 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-4" />
            {agent.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="size-4" />
            {agent.rating.toFixed(1)} rating
          </span>
          <span className="inline-flex items-center gap-1">
            <BadgeCheck className="size-4" />
            {agent.yearsExperience} years experience
          </span>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
          <p className="inline-flex items-center gap-1 font-medium">
            <ShieldCheck className="size-4" />
            Trust profile
          </p>
          <p className="mt-1">Verified listings: {agent.listingsVerified}</p>
          <p>Escrow compliance: {agent.escrowComplianceRate}%</p>
        </div>
      </CardContent>
    </Card>
  );
}
