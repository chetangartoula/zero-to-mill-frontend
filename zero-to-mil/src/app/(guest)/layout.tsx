import React, { PropsWithChildren } from "react";

interface AuthProps extends PropsWithChildren {}

function AuthLayout({ children }: AuthProps) {
  return <div>{children}</div>;
}

export default AuthLayout;
