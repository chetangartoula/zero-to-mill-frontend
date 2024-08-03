import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { PropsWithChildren } from "react";

export interface AuthWrapperProps {
  title: string;
  includeLogo?: boolean;
  logoSrc?: string;
  wrapperProps?: React.ComponentProps<"div">;
}

function AuthWrapper({
  title,
  children,
  includeLogo = true,
  logoSrc = "/ZeroToMilLogo.svg",
  wrapperProps = {
    className: "h-screen",
  },
}: AuthWrapperProps & PropsWithChildren) {
  return (
    <div className={cn("mx-4", wrapperProps?.className)}>
      {includeLogo && (
        <div className="flex justify-center mb-4">
          <Image src={logoSrc} alt={"logo"} width={100} height={24} priority />
        </div>
      )}

      <h1 className="font-switzer font-semibold text-2xl leading-5 text-center">
        {title}
      </h1>
      {children}
    </div>
  );
}

export default AuthWrapper;
