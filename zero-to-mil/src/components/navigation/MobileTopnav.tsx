import Image from "next/image";
import React from "react";
import DynamicIcon from "../utils/DynamicIcon";
import { Plus, Trash2 } from "lucide-react";

export interface MobileTopNavProps {
  logoSrc?: string;
  amount?: number;
}

function MobileTopNav({
  logoSrc = "/ZeroToMilLogo.svg",
  amount = 120,
}: MobileTopNavProps) {
  return (
    <div className="flex justify-between p-3 bg-gray-800">
      <div className="flex justify-start border items-center">
        <div className="flex justify-start h-6 fit-content m-0 mx-2">
          <Image src={logoSrc} alt={"logo"} width={24} height={24} priority />
        </div>
        <div className="text-white font-semibold">Zerotomil</div>
      </div>

      <div className="bg-background rounded-full">
        {true ? (
          <div className="flex items-center rounded-full p-2 gap-4">
            <DynamicIcon
              IconComponent={Plus}
              className="text-background bg-white rounded-full"
            />
            <p>{amount}$</p>
          </div>
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
