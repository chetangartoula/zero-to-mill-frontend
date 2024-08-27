import { StarIcon } from "lucide-react";
import { Route } from "./routes";

export const NavDrawerItem: Omit<Route, "special">[] = [
  {
    value: "account-setting",
    icon: StarIcon,
    label: "Account Setting",
  },
  {
    value: "login",
    icon: StarIcon,
    label: "Notifications",
  },
  {
    value: "verify",
    icon: StarIcon,
    label: "Verify",
  },
  {
    value: "deposit",
    icon: StarIcon,
    label: "Deposit",
  },
  {
    value: "withdraw",
    icon: StarIcon,
    label: "Withdraw",
  },
  {
    value: "transaction-history",
    icon: StarIcon,
    label: "Transaction History",
  },
];
