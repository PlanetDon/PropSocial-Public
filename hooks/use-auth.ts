"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { parseUserFromToken } from "@/lib/auth";
import { useUserStore } from "@/store/user-store";
import type { User } from "@/types/user";

interface SessionPayload {
  accessToken?: string;
}

export function useAuth() {
  const { user, setUser, clearUser } = useUserStore();

  const sessionQuery = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const session = await apiClient<SessionPayload>("/auth/session");
      const parsed = parseUserFromToken(session.accessToken ?? null);
      if (parsed) {
        setUser(parsed);
      } else {
        clearUser();
      }
      return parsed;
    },
    retry: false
  });

  return {
    user: (sessionQuery.data as User | null | undefined) ?? user,
    isAuthenticated: Boolean((sessionQuery.data as User | null | undefined) ?? user),
    isLoading: sessionQuery.isLoading,
    refetchSession: sessionQuery.refetch
  };
}
