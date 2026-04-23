import { create } from "zustand";
import type { LocationPermission, UserLocation } from "@/types/location";

const defaultLocation: UserLocation = {
  latitude: 0,
  longitude: 0,
  accuracy: 0,
  timestamp: 0,
  permission: "prompt",
  isTracking: false
};

interface LocationStoreState {
  location: UserLocation;
  error: string | null;
  isLoading: boolean;
  setPermission: (permission: LocationPermission) => void;
  setTracking: (isTracking: boolean) => void;
  setLocation: (location: Pick<UserLocation, "latitude" | "longitude" | "accuracy" | "timestamp">) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  resetLocation: () => void;
}

export const useLocationStore = create<LocationStoreState>((set) => ({
  location: defaultLocation,
  error: null,
  isLoading: false,
  setPermission: (permission) =>
    set((state) => ({
      location: {
        ...state.location,
        permission
      }
    })),
  setTracking: (isTracking) =>
    set((state) => ({
      location: {
        ...state.location,
        isTracking
      }
    })),
  setLocation: (location) =>
    set((state) => ({
      location: {
        ...state.location,
        ...location
      }
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  resetLocation: () => set({ location: defaultLocation, error: null, isLoading: false })
}));
