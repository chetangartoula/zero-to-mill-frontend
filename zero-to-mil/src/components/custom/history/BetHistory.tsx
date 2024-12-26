import { cn } from "@/lib/utils";
import { BetHistoryApiProps } from "@/types/base/history/betHistory";
import React from "react";

export interface BetHistoryProps {
  key: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  data: BetHistoryApiProps;
}

const getTextColor = (status: string) => {
  switch (status) {
    case "Won":
      return "text-haravara";
    case "Lost":
      return "text-destructive";
    default:
      return "text-muted";
  }
};

function BetHistory({ className, onClick, data, key }: BetHistoryProps) {
  return (
    <div key={key} className={cn("bg-input p-4", className)} onClick={onClick}>
      <div className="flex justify-between">
        <p className="font-bold">
          {data.slip_type === "single" ? "SINGLE" : "MULTIPLE"}
        </p>
        <p className="text-muted">{data.created_date}</p>
      </div>
      <div className="text-sm space-y-2 border-t border-muted pt-2 mt-2">
        {" "}
        <div className="flex justify-between">
          <p>Events: {data.total}</p>
          <p>
            {data.completed} of {data.total} completed
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-muted">Odds:</p>
            <p>{data.total_odds}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted">Bet:</p>
            <p>{data.bet_amount}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted">Status:</p>
            <p className={`${getTextColor(data.bet_status)}`}>
              {data.bet_status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BetHistory;
