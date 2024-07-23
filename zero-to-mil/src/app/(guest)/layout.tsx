import React, { PropsWithChildren } from "react";

interface AuthProps extends PropsWithChildren {}

function AuthLayout({ children }: AuthProps) {
  return <div className="w-full flex flex-col relative top-20">{children}</div>;
}

export default AuthLayout;
