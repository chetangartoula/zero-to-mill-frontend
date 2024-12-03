import { StarIcon } from "lucide-react";

export const carouseldata: {
  name: string;
  imageUrl?: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
}[] = [
  {
    name: "Home",
    icon: StarIcon,
    value: "dashboard",
  },
  {
    name: "Live",
    icon: StarIcon,
    value: "login",
  },
  {
    name: "Today",
    icon: StarIcon,
    value: "login",
  },
];
