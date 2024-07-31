import BottomBar from "@/components/navigation/BottomBar";
import React, { PropsWithChildren } from "react";

function ProtectedLayout({ children }: PropsWithChildren) {
  return (
    <div>
      {children}
      <BottomBar />
    </div>
  );
}

export default ProtectedLayout;
