import { createRealtimeSocket } from "@/lib/realtime";

export interface RealtimeNotification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
}

export function subscribeToNotifications(
  onNotification: (notification: RealtimeNotification) => void
): () => void {
  const socket = createRealtimeSocket("/notifications");

  socket.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data) as RealtimeNotification;
      onNotification(payload);
    } catch {
      onNotification({
        id: crypto.randomUUID(),
        title: "New update",
        message: event.data,
        createdAt: new Date().toISOString()
      });
    }
  };

  socket.onerror = () => {
    socket.close();
  };

  return () => socket.close();
}
