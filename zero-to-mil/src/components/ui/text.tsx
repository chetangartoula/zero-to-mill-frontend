import { cn } from "@/lib/utils";
import { Variant } from "@/types/global";
import React, { PropsWithChildren } from "react";
import { Props } from "recharts/types/container/Surface";

interface TextProps {
  text?: string;
  textProps?: React.HTMLProps<HTMLParagraphElement>;
  variant?: Variant;
  className?: string;
}

function Text({
  text,
  textProps,
  children,
  className,
  variant = "muted",
}: PropsWithChildren<TextProps>) {
  const textColor = {
    primary: "text-primary",
    secondary: "text-secondary",
    muted: "text-muted",
    white: "text-white",
  };

  return (
    <div
      className={cn(
        `text-sm ${textColor[variant]}`,
        className ?? textProps?.className
      )}
      {...textProps}
    >
      {text ?? children}
    </div>
  );
}

export default Text;
