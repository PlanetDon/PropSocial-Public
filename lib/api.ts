import type { ApiErrorResponse } from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

interface ApiRequestOptions extends RequestInit {
  authRequired?: boolean;
}

export async function apiClient<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { authRequired = false, headers, ...restOptions } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    ...restOptions
  });

  if (authRequired && response.status === 401) {
    throw new Error("Unauthorized request.");
  }

  if (!response.ok) {
    let apiError: ApiErrorResponse | undefined;
    try {
      apiError = (await response.json()) as ApiErrorResponse;
    } catch {
      apiError = undefined;
    }
    throw new Error(apiError?.message ?? `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
