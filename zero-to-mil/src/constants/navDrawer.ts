import { StarIcon } from "lucide-react";
import { Route } from "./routes";

export const NavDrawerItem: Omit<Route, "special">[] = [
  {
    value: "login",
    icon: StarIcon,
    label: "Account Setting",
  },
  {
    value: "login",
    icon: StarIcon,
    label: "Notifications",
  },
  {
    value: "login",
    icon: StarIcon,
    label: "Verify",
  },
  {
    value: "login",
    icon: StarIcon,
    label: "Deposit",
  },
  {
    value: "login",
    icon: StarIcon,
    label: "Withdraw",
  },
  {
    value: "login",
    icon: StarIcon,
    label: "Transaction History",
  },
];
