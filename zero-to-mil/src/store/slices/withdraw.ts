import { WithDrawDTO } from "@/types/base";
import { StateCreator } from "zustand";

export interface WithdrawState {
  user_identity: string;
  method: string;
  amount: number;
  withdraw_method: string;
  setWithdrawState: (state: WithDrawDTO) => void;
}

export const createWithdrawStore: StateCreator<WithdrawState> = (set) => ({
  user_identity: "",
  method: "",
  withdraw_method: "",
  amount: 0,
  setWithdrawState: (state) => set(state),
});
