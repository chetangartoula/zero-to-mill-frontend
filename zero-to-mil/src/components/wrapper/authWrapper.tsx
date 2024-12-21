import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { PropsWithChildren } from "react";

export interface AuthWrapperProps {
  title: string;
  includeLogo?: boolean;
  logoSrc?: string;
  wrapperProps?: React.ComponentProps<"div">;
  titleProp?: string;
}

function AuthWrapper({
  title,
  children,
  includeLogo = true,
  logoSrc = "/ZeroToMilLogo.svg",
  wrapperProps = {
    className: "h-screen",
  },
  titleProp = "text-center",
}: AuthWrapperProps & PropsWithChildren) {
  return (
    <div className={cn("mx-4", wrapperProps?.className)}>
      {includeLogo && (
        <div className="flex justify-center mb-4">
          <Image
            src={logoSrc}
            alt={"logo"}
            width={100}
            height={24}
            priority
            key={logoSrc}
          />
        </div>
      )}

      <h1
        className={cn(
          "font-switzer font-semibold text-2xl leading-5",
          titleProp
        )}
      >
        {title}
      </h1>
      {children}
    </div>
  );
}

export default AuthWrapper;
