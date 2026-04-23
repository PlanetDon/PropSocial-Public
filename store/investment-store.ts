import { create } from "zustand";

interface InvestmentStoreState {
  selectedAmount: number;
  selectedCurrency: string;
  setSelectedAmount: (amount: number) => void;
  setSelectedCurrency: (currency: string) => void;
}

export const useInvestmentStore = create<InvestmentStoreState>((set) => ({
  selectedAmount: 5000,
  selectedCurrency: "NGN",
  setSelectedAmount: (selectedAmount) => set({ selectedAmount }),
  setSelectedCurrency: (selectedCurrency) => set({ selectedCurrency })
}));
