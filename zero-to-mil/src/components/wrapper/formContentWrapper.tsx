import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

function FormContentWrapper({
  children,
  props,
  className,
}: PropsWithChildren & {
  props?: React.HTMLProps<HTMLDivElement>;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3 my-7", className)} {...props}>
      {children}
    </div>
  );
}

export default FormContentWrapper;
