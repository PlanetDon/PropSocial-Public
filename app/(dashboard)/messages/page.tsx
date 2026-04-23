"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRealtimeNotifications } from "@/hooks/use-realtime-notifications";

export default function MessagesPage() {
  const notifications = useRealtimeNotifications();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Messages and alerts</h1>
        <p className="text-sm text-slate-600">Realtime channel for agent chat, escrow updates, and risk alerts.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Realtime notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {notifications.map((notification) => (
            <article key={notification.id} className="rounded-lg border border-slate-200 p-3">
              <p className="font-medium text-slate-900">{notification.title}</p>
              <p className="text-sm text-slate-600">{notification.message}</p>
              <p className="mt-1 text-xs text-slate-500">
                {new Date(notification.createdAt).toLocaleString("en-NG")}
              </p>
            </article>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
