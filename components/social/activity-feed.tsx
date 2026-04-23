import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockActivity = [
  {
    id: "feed-1",
    user: "User A",
    message: "Great area, strong rental demand and reliable infrastructure.",
    location: "Lekki"
  },
  {
    id: "feed-2",
    user: "User B",
    message: "Watch flooding exposure in rainy season, ask for drainage records.",
    location: "Lekki"
  }
];

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Neighborhood feed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockActivity.map((item) => (
          <article key={item.id} className="rounded-lg border border-slate-200 p-3">
            <p className="text-sm font-medium text-slate-800">{item.user}</p>
            <p className="mt-1 text-sm text-slate-600">{item.message}</p>
            <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">{item.location}</p>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
