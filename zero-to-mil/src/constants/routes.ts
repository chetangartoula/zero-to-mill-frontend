import { ClockIcon, MenuIcon, ReceiptIcon, StarIcon } from "lucide-react";
import { PageRoutes } from "./pageRoutes";

export interface Route {
  value: keyof typeof PageRoutes;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  special?: boolean;
}

export const routes: Route[] = [
  {
    value: "dashboard",
    icon: StarIcon,
    label: "Sports",
  },
  {
    value: "login",
    icon: StarIcon,
    label: "Favorites",
  },
  {
    value: "login",
    icon: ReceiptIcon,
    label: "Bet slip",
    special: true,
  },
  {
    value: "login",
    icon: ClockIcon,
    label: "History",
  },
];
