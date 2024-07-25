import React from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { StarIcon, ReceiptIcon, ClockIcon, MenuIcon } from "lucide-react";
function BottomBar() {
  return (
    <Menubar className="fixed bottom-0 w-full bg-gray-900 flex justify-between items-center h-13 rounded-none">
      <MenubarMenu>
        <MenubarTrigger className="flex flex-col items-center py-2">
          <StarIcon className="h-5 w-5 text-red-500" />
          <span className="text-xs text-red-500">Sports</span>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="flex flex-col items-center py-2">
          <StarIcon className="h-5 w-5 text-gray-400" />
          <span className="text-xs text-gray-400">Favorites</span>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="flex flex-col items-center py-2 relative">
          <div className="absolute -top-6 flex items-center justify-center w-12 h-12 rounded-full bg-pink-500 shadow-lg">
            <ReceiptIcon className="h-7 w-7 text-white" />
          </div>
          <span className="text-xs text-gray-400 mt-7">Bet slip</span>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="flex flex-col items-center py-2">
          <ClockIcon className="h-5 w-5 text-gray-400" />
          <span className="text-xs text-gray-400">History</span>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="flex flex-col items-center py-2">
          <MenuIcon className="h-5 w-5 text-gray-400" />
          <span className="text-xs text-gray-400">Menu</span>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}

export default BottomBar;
