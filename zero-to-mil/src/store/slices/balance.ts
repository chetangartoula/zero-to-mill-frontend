import { StateCreator } from "zustand";

export interface BalanceState {
  lein: number;
  main: number;
  stake: number;
  setBalance: (balance: Omit<BalanceState, "setBalance">) => void;
}

export const createBalanceStore: StateCreator<BalanceState> = (set) => ({
  lein: 0,
  main: 0,
  stake: 0,
  setBalance: (balance) => set(balance),
});
