import { create } from "zustand";

interface UiStoreState {
  isHighContrast: boolean;
  isFiltersOpen: boolean;
  toggleHighContrast: () => void;
  setFiltersOpen: (isOpen: boolean) => void;
}

export const useUiStore = create<UiStoreState>((set) => ({
  isHighContrast: false,
  isFiltersOpen: false,
  toggleHighContrast: () => set((state) => ({ isHighContrast: !state.isHighContrast })),
  setFiltersOpen: (isFiltersOpen) => set({ isFiltersOpen })
}));
