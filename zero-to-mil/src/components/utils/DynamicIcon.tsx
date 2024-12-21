import { cn } from "@/lib/utils";
import React from "react";

interface DynamicIconProps {
  IconComponent: React.ComponentType<{ className?: string }>;
  className?: string;
  onClick?: () => void;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
  IconComponent,
  className,
  onClick,
}) => {
  return (
    <div onClick={onClick}>
      <IconComponent className={cn("h-5 w-5 ", className)} />
    </div>
  );
};

export default DynamicIcon;
