"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProperties } from "@/services/property.service";

export function useProperties() {
  return useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
    staleTime: 60_000
  });
}
