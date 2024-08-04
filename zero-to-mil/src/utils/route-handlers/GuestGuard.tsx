import React, { PropsWithChildren } from "react";
import { getAuthTokens } from "../token";

function GuestGuard({ children }: PropsWithChildren) {
  const isAuthenticated = getAuthTokens();

  return <div>{children}</div>;
}

export default GuestGuard;
