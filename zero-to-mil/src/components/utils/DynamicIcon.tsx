import { cn } from "@/lib/utils";
import React from "react";

interface DynamicIconProps {
  IconComponent: React.ComponentType<{ className?: string }>;
  className?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
  IconComponent,
  className,
}) => {
  return <IconComponent className={cn("h-5 w-5 ", className)} />;
};

export default DynamicIcon;
