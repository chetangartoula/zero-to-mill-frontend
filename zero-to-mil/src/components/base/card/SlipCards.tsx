import DynamicIcon from "@/components/utils/DynamicIcon";
import { cn } from "@/lib/utils";
import { BetSlipProps } from "@/types/base/betslip";
import { BetSlips } from "@/types/base/history";
import { StarIcon } from "lucide-react";
import React from "react";

function SlipCards({
  className,
  data,
  onCancel,
}: {
  className?: string;
  data?: BetSlips | BetSlipProps;
  onCancel?: (data: any) => void;
}) {
  return (
    <div className={cn("p-4  bg-menu", className)}>
      <div className="flex justify-between">
        <div className="flex">
          <DynamicIcon IconComponent={StarIcon} className={"text-cardtitle"} />
          <div className="flex gap-2 justify-between w-full px-4 text-s text-cardtitle">
            <div>{data?.home_team}</div>
            <div className="font-bold">VS</div>
            <div className="text-end">{data?.away_team}</div>
          </div>
        </div>
        {onCancel && (
          <div className="text-muted" onClick={() => onCancel?.(data)}>
            X
          </div>
        )}
      </div>

      <div className="flex items-center pt-2">
        <div className=" min-w-12 min-h-11 rounded bg-input text-center flex justify-center  items-center ">
          <p className="fw-normal">{data?.odds}</p>
        </div>
        <div className="ml-2 text-xs">
          <p>{data?.selected_team}</p>
          <p className="text-muted pt-2">1x2</p>
        </div>
      </div>
    </div>
  );
}

export default SlipCards;
