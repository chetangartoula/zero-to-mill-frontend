import { BalanceState } from "./slices/balance";

export type Store = MPINGState &
  LoginState &
  AccessTokenState &
  WithdrawState &
  BetSlipState &
  BalanceState;
