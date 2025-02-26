import { AccessTokenState } from "./slices/accessToken";
import { BalanceState } from "./slices/balance";
import { BetListState } from "./slices/betList";
import { BetSlipState } from "./slices/betSlip";
import { LoginState } from "./slices/login";
import { MPINGState } from "./slices/mpin";
import { ProfileState } from "./slices/profile";
import { WithdrawState } from "./slices/withdraw";

export type Store = MPINGState &
  LoginState &
  AccessTokenState &
  WithdrawState &
  BetListState &
  BetSlipState &
  BalanceState &
  ProfileState;
