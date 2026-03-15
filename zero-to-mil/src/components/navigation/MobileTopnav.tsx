"use client";
import Image from "next/image";
import React, { use, useState, useEffect } from "react";
import DynamicIcon from "../utils/DynamicIcon";
import { Plus, Trash2, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useAppStore } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import { getPageRoutes } from "@/utils/getRoutes";
import { routes } from "@/constants/routes";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { round } from "lodash";

export interface MobileTopNavProps {
  logoSrc?: string;
  amount?: number;
}

function normalizePath(path: string): string {
  return path.replace(/^\/+/, "./");
}

function MobileTopNav({
  logoSrc = "/ZeroToMilLogo.svg",
  amount = 120,
}: MobileTopNavProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { lien, main, stake } = useAppStore((state) => state);
  const router = useRouter();
  const params = usePathname();
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex justify-between p-3 bg-navbackground sticky top-0 z-50">
      <div className="flex justify-start items-center">
        <div className="flex justify-start h-6 fit-content m-0 mx-2">
          <Image src={logoSrc} alt={"logo"} width={60} height={60} priority />
        </div>
        <div className="text-white font-semibold">Zerotomil</div>
      </div>

      <div className="w-1/2">
        <Menubar className="w-full bg-transaparent border border-none flex justify-between items-center rounded-none hidden md:flex">
          {routes.map((item, index) => (
            <MenubarMenu key={`${item.value}.${index}`}>
              <MenubarTrigger
                className={`flex flex-col items-center py-1 `}
                onClick={() => router.push(getPageRoutes(item.value))}
              >
                <span
                  className={`text-xs ${
                    normalizePath(params)?.includes(getPageRoutes(item.value))
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-gray-400"
                  } `}
                >
                  {item.label}
                </span>
              </MenubarTrigger>
            </MenubarMenu>
          ))}
        </Menubar>
      </div>

      <div className="flex items-center gap-4">
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`text-white hover:bg-gray-700 rounded-full border border-white w-8 h-8 flex items-center justify-center p-0 ${theme === "dark" ? "text-white border-white" : "text-muted-text border-muted-text"}`}
          >
            {theme === "dark" ? (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
              
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        )}

        <div
          className="bg-muted rounded-full relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsHovered(!isHovered)}
        >
          {true ? (
            <HoverCard openDelay={0} open={isHovered}>
              <HoverCardTrigger asChild>
                <Button
                  variant="link"
                  size="nav"
                  className="hover:cursor-pointer"
                >
                  <div className="flex items-center rounded-full gap-3">
                    <DynamicIcon
                      IconComponent={Plus}
                      className="text-white bg-muted-text rounded-full p-1"
                      onClick={() => router.push(getPageRoutes("deposit"))}
                    />
                    <p className="text-muted-text">{round(main, 2)}$</p>
                  </div>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-60 mr-2 rounded-lg" sideOffset={5}>
                <div className="flex justify-between">
                  <p className="text-sm text-start">Available</p>
                  <p className="text-primary text-lg">${round(main, 2)}</p>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <p className="text-sm text-center">On Stake</p>
                  <p className="text-primary text-lg">${stake}</p>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <p className="text-sm text-end">Lien</p>
                  <p className="text-primary text-lg">${lien}</p>
                </div>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <div className="text-white">
              {" "}
              <DynamicIcon IconComponent={Trash2} className="text-destructive" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileTopNav;
