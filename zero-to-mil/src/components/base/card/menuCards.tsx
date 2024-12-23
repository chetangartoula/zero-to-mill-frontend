import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

export interface MenuCardProps {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  cardProps?: React.HTMLProps<HTMLDivElement>;
  textProps?: React.HTMLProps<HTMLParagraphElement>;
  isActive?: boolean;
}
function MenuCards({
  children,
  title,
  icon: Icon,
  onClick,
  cardProps,
  textProps,
  isActive,
}: PropsWithChildren<MenuCardProps>) {
  return (
    <Card
      className={cn(
        " rounded",
        {
          "bg-input": !isActive,
          "bg-haravara": isActive,
        },
        cardProps?.className
      )}
      onClick={onClick}
      {...cardProps}
    >
      <CardContent className="flex aspect-square items-center justify-start p-3">
        {Icon && (
          <div className="p-1">
            <Icon className="text-icon h-4" />
          </div>
        )}
        <p
          className={cn(
            "text-xs text-white font-semibold",
            textProps?.className
          )}
        >
          {title}
        </p>
      </CardContent>
      {children}
    </Card>
  );
}

export default MenuCards;
