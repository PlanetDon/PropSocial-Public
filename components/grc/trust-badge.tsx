import { CheckCircle2, ShieldCheck, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PropertyRisk } from "@/types/property";

interface TrustBadgeProps {
  type: "verified" | "escrow" | "legal" | "risk";
  riskLevel?: PropertyRisk;
}

export function TrustBadge({ type, riskLevel = "low" }: TrustBadgeProps) {
  if (type === "verified") {
    return (
      <Badge variant="success" className="gap-1">
        <CheckCircle2 className="size-3.5" />
        Verified
      </Badge>
    );
  }

  if (type === "escrow") {
    return (
      <Badge variant="outline" className="gap-1 border-blue-200 bg-blue-50 text-blue-700">
        <ShieldCheck className="size-3.5" />
        Escrow Protected
      </Badge>
    );
  }

  if (type === "legal") {
    return (
      <Badge variant="outline" className="gap-1">
        Legal Verified
      </Badge>
    );
  }

  const riskVariant = riskLevel === "high" ? "danger" : riskLevel === "medium" ? "warning" : "success";

  return (
    <Badge variant={riskVariant} className="gap-1">
      <TriangleAlert className="size-3.5" />
      Risk {riskLevel}
    </Badge>
  );
}
