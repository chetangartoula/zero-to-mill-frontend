"use client";
import React from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { routes } from "@/constants/routes";
import DynamicIcon from "../utils/DynamicIcon";
import { usePathname, useRouter } from "next/navigation";
import { getPageRoutes } from "@/utils/getRoutes";

function normalizePath(path: string): string {
  return path.replace(/^\/+/, "./");
}

function BottomBar() {
  const router = useRouter();
  const params = usePathname();
  return (
    <Menubar className="fixed bottom-0 w-full bg-gray-900 flex justify-between items-center h-13 rounded-none">
      {routes.map((item, index) => (
        <MenubarMenu key={`${item.value}.${index}`}>
          <MenubarTrigger
            className={`flex flex-col items-center py-2 relative `}
            onClick={() => router.push(getPageRoutes(item.value))}
          >
            {item.special ? (
              <div className="absolute -top-6 flex items-center justify-center w-12 h-12 rounded-full bg-primary shadow-lg">
                <DynamicIcon
                  IconComponent={item.icon}
                  className="text-white "
                />
              </div>
            ) : (
              <DynamicIcon
                IconComponent={item.icon}
                className={`${
                  normalizePath(params)?.includes(getPageRoutes(item.value))
                    ? "text-primary"
                    : "text-gray-400"
                }`}
              />
            )}
            <span
              className={`text-xs ${
                normalizePath(params)?.includes(getPageRoutes(item.value))
                  ? "text-primary"
                  : "text-gray-400"
              } ${item.special ? "mt-7" : "mt-2"}`}
            >
              {item.label}
            </span>
          </MenubarTrigger>
        </MenubarMenu>
      ))}
    </Menubar>
  );
}

export default BottomBar;
