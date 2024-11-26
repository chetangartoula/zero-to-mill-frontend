import DynamicIcon from "@/components/utils/DynamicIcon";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import React from "react";

function SlipCards({ className }: { className?: string }) {
  return (
    <div className={cn("p-4  bg-menu", className)}>
      <div className="flex justify-between">
        <div className="flex">
          <DynamicIcon IconComponent={StarIcon} className={"text-cardtitle"} />
          <p className="ml-2 text-s text-cardtitle">Real Kashmir vs Trau FC</p>
        </div>
        <div className="text-muted">X</div>
      </div>

      <div className="flex items-center pt-2">
        <div className=" min-w-12 min-h-11 rounded bg-input text-center flex justify-center  items-center ">
          <p className="fw-normal">50.5</p>
        </div>
        <div className="ml-2 text-xs">
          <p>Trau FC</p>
          <p className="text-muted pt-2">1x2</p>
        </div>
      </div>
    </div>
  );
}

export default SlipCards;
