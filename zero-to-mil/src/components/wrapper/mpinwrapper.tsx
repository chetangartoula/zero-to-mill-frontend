import React, { PropsWithChildren } from "react";

export interface MPINWrapperProps {
  initialSignup?: boolean;
  isMPIN?: boolean;
  displayonEveryRender?: boolean;
}

function MPINWrapper({ children }: PropsWithChildren) {
  const initialSetUp = true;
  if (initialSetUp) {
  }
  return <div>{children}</div>;
}

export default MPINWrapper;
