import { WithDrawDTO } from "@/types/base";
import { StateCreator } from "zustand";

export interface WithdrawState {
  email: string;
  method: string;
  amount: number;
  setWithdrawState: (state: WithDrawDTO) => void;
}

export const createWithdrawStore: StateCreator<WithdrawState> = (set) => ({
  email: "",
  method: "",
  amount: 0,
  setWithdrawState: (state) => set(state),
});
