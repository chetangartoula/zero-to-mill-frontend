"use client";
import MenuComponent from "@/components/custom/menu";
import MobileTopNav from "@/components/navigation/MobileTopnav";
import React from "react";

function MobileMenuPage() {
  return (
    <div className="flex flex-col h-screen">
      <MobileTopNav />
      <MenuComponent />
    </div>
  );
}

export default MobileMenuPage;
