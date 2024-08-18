import BottomBar from "@/components/navigation/BottomBar";
import getAccessToken from "@/store/actions/getAccessToken";
import React, { PropsWithChildren } from "react";

function ProtectedLayout({ children }: PropsWithChildren) {
  const test = getAccessToken();
  console.log(test);
  return (
    <div>
      {children}
      <BottomBar />
    </div>
  );
}

export default ProtectedLayout;
