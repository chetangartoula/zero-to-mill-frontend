import { StateCreator } from "zustand";

export interface BalanceState {
  numberOfSlips: number;
  setBalance: (numberOfSlips: number) => void;
}

export const createBetSlipStore: StateCreator<BalanceState> = (set) => ({
  numberOfSlips: 0,
  setBalance: (numberOfSlips: number) => set({ numberOfSlips }),
});
