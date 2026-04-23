import { Sparkles, TriangleAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AiInsightPanelProps {
  insights: string[];
}

export function AiInsightPanel({ insights }: AiInsightPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="inline-flex items-center gap-2 text-base">
          <Sparkles className="size-4 text-[--color-accent-gold-500]" />
          AI insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-slate-700">
          {insights.map((insight) => (
            <li key={insight} className="flex gap-2">
              <TriangleAlert className="mt-0.5 size-4 text-amber-500" />
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
