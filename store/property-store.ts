import { create } from "zustand";

interface PropertyFilterState {
  query: string;
  location: string;
  minPrice?: number;
  maxPrice?: number;
  verifiedOnly: boolean;
}

interface PropertyStoreState {
  filters: PropertyFilterState;
  setFilters: (filters: Partial<PropertyFilterState>) => void;
  resetFilters: () => void;
}

const initialFilters: PropertyFilterState = {
  query: "",
  location: "",
  verifiedOnly: false
};

export const usePropertyStore = create<PropertyStoreState>((set) => ({
  filters: initialFilters,
  setFilters: (filters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters
      }
    })),
  resetFilters: () => set({ filters: initialFilters })
}));
