"use client";
import BottomBar from "@/components/navigation/BottomBar";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

function ProtectedLayout({}: Props) {
  const params = usePathname();
  return (
    <div>
      <BottomBar />
    </div>
  );
}

export default ProtectedLayout;
