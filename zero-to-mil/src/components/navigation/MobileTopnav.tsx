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
    <div className="sticky top-0 z-50 border-b border-border/60 bg-navbackground/80 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center px-4 py-3 sm:px-6">
        <div className="flex justify-start items-center gap-2">
          <div className="flex justify-start h-6 fit-content m-0">
            <Image
              src={logoSrc}
              alt={"logo"}
              width={60}
              height={60}
              priority
            />
          </div>
          <div className="text-foreground font-display font-semibold tracking-tight text-sm sm:text-base">
            Zerotomil
          </div>
        </div>

        <div className="w-1/2 hidden md:flex">
          <Menubar className="w-full bg-transparent border-0 flex justify-between items-center rounded-none">
            {routes.map((item, index) => (
              <MenubarMenu key={`${item.value}.${index}`}>
                <MenubarTrigger
                  className="flex flex-col items-center py-1"
                  onClick={() => router.push(getPageRoutes(item.value))}
                >
                  <span
                    className={`text-xs font-medium ${
                      normalizePath(params)?.includes(getPageRoutes(item.value))
                        ? "text-primary border-b-2 border-primary pb-1"
                        : "text-muted-foreground"
                    } `}
                  >
                    {item.label}
                  </span>
                </MenubarTrigger>
              </MenubarMenu>
            ))}
          </Menubar>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`rounded-full border w-8 h-8 flex items-center justify-center p-0 transition-colors ${
                theme === "dark"
                  ? "text-foreground border-border/60 bg-accent/50 hover:bg-accent"
                  : "text-foreground border-border/60 bg-accent/60 hover:bg-accent"
              }`}
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
            className="bg-card/80 border border-border/60 rounded-full relative shadow-sm"
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
                        className="text-primary-foreground bg-primary rounded-full p-1"
                        onClick={() => router.push(getPageRoutes("deposit"))}
                      />
                      <p className="text-foreground font-medium">
                        {round(main, 2)}$
                      </p>
                    </div>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent
                  className="w-60 mr-2 rounded-lg"
                  sideOffset={5}
                >
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
              <div className="text-foreground">
                <DynamicIcon
                  IconComponent={Trash2}
                  className="text-destructive"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileTopNav;
