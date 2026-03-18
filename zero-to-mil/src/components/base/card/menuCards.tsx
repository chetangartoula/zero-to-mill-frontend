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
          "bg-primary": isActive,
        },
        cardProps?.className
      )}
      onClick={onClick}
      {...cardProps}
    >
      <CardContent className="flex aspect-square items-center justify-start p-3">
        {Icon && (
          <div className="p-1">
            <Icon
              className={cn("h-4", {
                "text-white": isActive,
                "text-icon": !isActive,
              })}
            />
          </div>
        )}
        <p
          className={cn(
            "text-xs text-foreground font-semibold",
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
