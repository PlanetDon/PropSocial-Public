import { AgentOfficePanel } from "@/components/agent/agent-office-panel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAgentProfile } from "@/services/agent.service";

interface AgentPageProps {
  params: Promise<{ id: string }>;
}

export default async function AgentPage({ params }: AgentPageProps) {
  const { id } = await params;
  const agent = await fetchAgentProfile(id);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <section className="space-y-4 lg:col-span-2">
        <header>
          <h1 className="text-3xl font-bold text-slate-900">Virtual office</h1>
          <p className="mt-1 text-sm text-slate-600">
            Verified agent workspace with trust metrics and performance history.
          </p>
        </header>
        <AgentOfficePanel agent={agent} />
      </section>

      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Interactive actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full">Chat agent</Button>
            <Button variant="secondary" className="w-full">
              Book inspection
            </Button>
            <Button variant="secondary" className="w-full">
              Request documents
            </Button>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
