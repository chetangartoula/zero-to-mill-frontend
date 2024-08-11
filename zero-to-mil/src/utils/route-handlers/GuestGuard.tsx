import React, { PropsWithChildren } from "react";

function GuestGuard({ children }: PropsWithChildren) {
  const isAuthenticated = true;

  return <div>{children}</div>;
}

export default GuestGuard;
