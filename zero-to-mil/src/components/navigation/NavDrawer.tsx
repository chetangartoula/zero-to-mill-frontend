"use client";

import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import DynamicIcon from "../utils/DynamicIcon";
import { MenuIcon } from "lucide-react";

function NavDrawer() {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <div>
          <DynamicIcon
            IconComponent={MenuIcon}
            className={`${"text-gray-400"}`}
          />
          <span className="text-xs text-gray-400 mt-2">Menu</span>
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-full w-full max-w-full">
        <div className="p-4 h-[calc(100vh-180px)] overflow-y-auto">test</div>
      </DrawerContent>
    </Drawer>
  );
}

export default NavDrawer;
