const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL ?? "ws://localhost:8080/ws";

export function createRealtimeSocket(path = "/notifications"): WebSocket {
  return new WebSocket(`${WS_BASE_URL}${path}`);
}

export function createSseConnection(path: string, onMessage: (payload: unknown) => void): EventSource {
  const eventSource = new EventSource(path, { withCredentials: true });
  eventSource.onmessage = (event) => {
    try {
      onMessage(JSON.parse(event.data));
    } catch {
      onMessage(event.data);
    }
  };
  return eventSource;
}
