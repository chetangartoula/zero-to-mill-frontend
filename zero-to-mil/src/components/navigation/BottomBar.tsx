"use client";
import React from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { routes } from "@/constants/routes";
import DynamicIcon from "../utils/DynamicIcon";
import { usePathname, useRouter } from "next/navigation";
import { getPageRoutes } from "@/utils/getRoutes";
import { useAppStore } from "@/store";

function normalizePath(path: string): string {
  return path.replace(/^\/+/, "./");
}

function BBar() {
  const router = useRouter();
  const params = usePathname();
  const { numberOfSlips } = useAppStore((state) => state);
  return (
    <Menubar
      className="fixed bottom-0 w-full bg-accent flex justify-between items-center h-13 rounded-none md:hidden z-[100]"
      onClick={(e) => e.stopPropagation()}
      style={{ pointerEvents: "auto" }}
    >
      {routes.map((item, index) => (
        <MenubarMenu key={`${item.value}.${index}`}>
          <MenubarTrigger
            className={`flex flex-col items-center py-1 relative `}
            onClick={() => router.push(getPageRoutes(item.value))}
          >
            {item.special ? (
              <div className="absolute -top-6 flex items-center justify-center w-12 h-12 rounded-full bg-primary shadow-lg">
                <DynamicIcon
                  IconComponent={item.icon}
                  className="text-white "
                />
                {numberOfSlips > 0 && (
                  <div className="absolute -bottom-1 -right-0 bg-white text-primary text-xs rounded-full w-4 h-4 flex items-center justify-center z-10">
                    {numberOfSlips}
                  </div>
                )}
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
      {/* <MenubarMenu>
          <MenubarTrigger
            className={`flex flex-col items-center py-1 relative `}
          >
            <NavDrawer />
          </MenubarTrigger>
        </MenubarMenu> */}
    </Menubar>
  );
}

export const BottomBar = React.memo(BBar);
