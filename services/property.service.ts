import { apiClient } from "@/lib/api";
import { mockProperties } from "@/lib/mock-data";
import type { ApiListResponse, ApiSingleResponse } from "@/types/api";
import type { Property } from "@/types/property";

export async function fetchProperties(): Promise<Property[]> {
  try {
    const response = await apiClient<ApiListResponse<Property>>("/properties");
    return response.data;
  } catch {
    return mockProperties;
  }
}

export async function fetchPropertyById(propertyId: string): Promise<Property | null> {
  try {
    const response = await apiClient<ApiSingleResponse<Property>>(`/properties/${propertyId}`);
    return response.data;
  } catch {
    return mockProperties.find((property) => property.id === propertyId) ?? null;
  }
}
