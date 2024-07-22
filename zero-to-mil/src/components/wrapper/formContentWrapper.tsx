import React, { PropsWithChildren } from "react";

function FormContentWrapper({ children }: PropsWithChildren) {
  return <div className="space-y-3 my-7">{children}</div>;
}

export default FormContentWrapper;
