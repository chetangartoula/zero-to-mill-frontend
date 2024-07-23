import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

function FormContentWrapper({
  children,
  props,
}: PropsWithChildren & {
  props?: React.HTMLProps<HTMLDivElement>;
}) {
  return (
    <div className={cn("space-y-3 my-7", props?.className)} {...props}>
      {children}
    </div>
  );
}

export default FormContentWrapper;
