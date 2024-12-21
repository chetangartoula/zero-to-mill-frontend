import Image from "next/image";
import React, { useState } from "react";
import DynamicIcon from "../utils/DynamicIcon";
import { Plus, Trash2 } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Button } from "../ui/button";
import { SelectSeparator } from "../ui/select";
import { Separator } from "../ui/separator";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";
import { getPageRoutes } from "@/utils/getRoutes";

export interface MobileTopNavProps {
  logoSrc?: string;
  amount?: number;
}

function MobileTopNav({
  logoSrc = "/ZeroToMilLogo.svg",
  amount = 120,
}: MobileTopNavProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { lein, main, stake } = useAppStore((state) => state);
  const router = useRouter();
  return (
    <div className="flex justify-between p-3 bg-gray-800">
      <div className="flex justify-start border items-center">
        <div className="flex justify-start h-6 fit-content m-0 mx-2">
          <Image src={logoSrc} alt={"logo"} width={24} height={24} priority />
        </div>
        <div className="text-white font-semibold">Zerotomil</div>
      </div>

      <div
        className="bg-background rounded-full relative"
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
                    className="text-background bg-white rounded-full"
                    onClick={() => router.push(getPageRoutes("deposit"))}
                  />
                  <p>{main}$</p>
                </div>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-60 mr-2 rounded-lg" sideOffset={5}>
              <div className="flex justify-between">
                <p className="text-sm text-start">Available</p>
                <p className="text-primary text-lg">${main}</p>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between">
                <p className="text-sm text-center">On Stake</p>
                <p className="text-primary text-lg">${stake}</p>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between">
                <p className="text-sm text-end">Lein</p>
                <p className="text-primary text-lg">${lein}</p>
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
  );
}

export default MobileTopNav;
