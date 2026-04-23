import { CheckCircle2, CircleDashed, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ComplianceProfile } from "@/types/user";

interface ComplianceStatusProps {
  compliance: ComplianceProfile;
}

function statusIcon(status: "pending" | "verified" | "rejected" | "cleared" | "flagged") {
  if (status === "verified" || status === "cleared") {
    return <CheckCircle2 className="size-4 text-emerald-600" aria-hidden />;
  }
  if (status === "rejected" || status === "flagged") {
    return <XCircle className="size-4 text-red-600" aria-hidden />;
  }
  return <CircleDashed className="size-4 text-amber-600" aria-hidden />;
}

export function ComplianceStatus({ compliance }: ComplianceStatusProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance status</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex items-center justify-between">
            <span>KYC</span>
            <span className="inline-flex items-center gap-1 capitalize">
              {statusIcon(compliance.kycStatus)}
              {compliance.kycStatus}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span>AML</span>
            <span className="inline-flex items-center gap-1 capitalize">
              {statusIcon(compliance.amlStatus)}
              {compliance.amlStatus}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span>Transaction monitoring</span>
            <span className="inline-flex items-center gap-1">
              {compliance.transactionMonitoringEnabled ? (
                <CheckCircle2 className="size-4 text-emerald-600" aria-hidden />
              ) : (
                <XCircle className="size-4 text-red-600" aria-hidden />
              )}
              {compliance.transactionMonitoringEnabled ? "Enabled" : "Disabled"}
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
