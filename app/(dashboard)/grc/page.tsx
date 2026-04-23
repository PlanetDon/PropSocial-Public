import { EscrowStatusIndicator } from "@/components/grc/escrow-status-indicator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAuditLogs, fetchEscrowRecords, fetchRiskExposure } from "@/services/grc.service";

export default async function GrcPage() {
  const [auditLogs, escrowRecords, riskExposure] = await Promise.all([
    fetchAuditLogs(),
    fetchEscrowRecords(),
    fetchRiskExposure()
  ]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">GRC dashboard</h1>
        <p className="text-sm text-slate-600">
          Escrow tracking, audit trails, and risk indicators exposed directly in the UI.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Escrow transactions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {escrowRecords.map((record) => (
              <div key={record.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3">
                <div>
                  <p className="font-medium text-slate-900">{record.propertyId}</p>
                  <p className="text-xs text-slate-500">{new Date(record.updatedAt).toLocaleDateString("en-NG")}</p>
                </div>
                <EscrowStatusIndicator status={record.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk exposure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {riskExposure.map((risk) => (
              <article key={risk.label} className="rounded-lg border border-slate-200 p-3">
                <p className="font-medium text-slate-900">{risk.label}</p>
                <p className="mt-1 text-sm text-slate-600">{risk.detail}</p>
                <Badge
                  variant={
                    risk.level === "high" ? "danger" : risk.level === "medium" ? "warning" : "success"
                  }
                  className="mt-2"
                >
                  {risk.level} risk
                </Badge>
              </article>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Audit log</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {auditLogs.map((audit) => (
            <div key={audit.id} className="rounded-lg border border-slate-200 p-3">
              <p className="font-medium text-slate-900">{audit.transactionId}</p>
              <p className="text-sm text-slate-600">Status: {audit.status}</p>
              <p className="text-xs text-slate-500">Verification hash: {audit.verificationHash}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
