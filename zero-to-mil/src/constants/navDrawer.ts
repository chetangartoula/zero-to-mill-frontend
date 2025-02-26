import {
  BellDot,
  HandCoins,
  PiggyBank,
  UserRoundPen,
  Wallet,
} from "lucide-react";
import { Route } from "./routes";

export const NavDrawerItem: Omit<Route, "special">[] = [
  {
    value: "account-setting",
    icon: UserRoundPen,
    label: "Account Setting",
  },
  {
    value: "notifications",
    icon: BellDot,
    label: "Notifications",
  },
  {
    value: "deposit",
    icon: PiggyBank,
    label: "Deposit",
  },
  {
    value: "withdraw",
    icon: HandCoins,
    label: "Withdraw",
  },
  {
    value: "history",
    icon: Wallet,
    label: "Transaction History",
  },
];
