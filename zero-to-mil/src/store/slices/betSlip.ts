import { StateCreator } from "zustand";

export interface BetSlipState {
  numberOfSlips: number;
  setSlip: (numberOfSlips: number) => void;
}

export const createBetSlipStore: StateCreator<BetSlipState> = (set) => ({
  numberOfSlips: 0,
  setSlip: (numberOfSlips: number) => set({ numberOfSlips }),
});
