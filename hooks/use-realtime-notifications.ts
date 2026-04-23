"use client";

import { useEffect, useState } from "react";
import { subscribeToNotifications, type RealtimeNotification } from "@/services/chat.service";

const fallbackNotification: RealtimeNotification = {
  id: "system",
  title: "System ready",
  message: "Realtime notifications are enabled.",
  createdAt: new Date().toISOString()
};

export function useRealtimeNotifications() {
  const [notifications, setNotifications] = useState<RealtimeNotification[]>([fallbackNotification]);

  useEffect(() => {
    const unsubscribe = subscribeToNotifications((notification) => {
      setNotifications((current) => [notification, ...current].slice(0, 20));
    });
    return () => unsubscribe();
  }, []);

  return notifications;
}
