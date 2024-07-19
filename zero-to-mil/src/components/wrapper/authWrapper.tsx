import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { PropsWithChildren } from "react";

export interface AuthWrapperProps {
  title: string;
  wrapperProps?: React.ComponentProps<"div">;
}

function AuthWrapper({
  title,
  children,
  wrapperProps = {
    className: "h-screen",
  },
}: AuthWrapperProps & PropsWithChildren) {
  return (
    <div className={cn("", wrapperProps?.className)}>
      <div className="flex justify-center mb-4">
        <Image
          src={"/ZeroToMilLogo.svg"}
          alt={"logo"}
          width={100}
          height={24}
          priority
        />
      </div>

      <h1 className="font-switzer font-semibold text-2xl leading-5 text-center">
        {title}
      </h1>
      {children}
    </div>
  );
}

export default AuthWrapper;
