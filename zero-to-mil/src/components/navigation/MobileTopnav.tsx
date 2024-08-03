import Image from "next/image";
import React from "react";

export interface MobileTopNavProps {
  logoSrc?: string;
}

function MobileTopNav({ logoSrc = "/ZeroToMilLogo.svg" }: MobileTopNavProps) {
  return (
    <div className="flex justify-start p-3 bg-gray-800 border ">
      <div className="flex justify-start h-6 border border-white m-0">
        <Image src={logoSrc} alt={"logo"} width={100} height={24} priority />
      </div>
      <div className="text-white">ZeroToMil</div>
    </div>
  );
}

export default MobileTopNav;
