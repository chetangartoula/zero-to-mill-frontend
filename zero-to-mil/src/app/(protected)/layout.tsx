import BottomBar from "@/components/navigation/BottomBar";
import React from "react";

type Props = {};

function ProtectedLayout({}: Props) {
  return (
    <div>
      <BottomBar />
    </div>
  );
}

export default ProtectedLayout;
