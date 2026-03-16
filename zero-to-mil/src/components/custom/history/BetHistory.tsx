import { cn } from "@/lib/utils";
import { BetHistoryApiProps } from "@/types/base/history/betHistory";
import { round } from "lodash";
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
      return "text-muted-foreground";
  }
};

function BetHistory({ className, onClick, data, key }: BetHistoryProps) {
  return (
    <div
      key={key}
      className={cn(
        "bg-card/80 border border-border/60 rounded-2xl p-4 mb-3 shadow-sm hover:shadow-md transition-shadow",
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between">
        <p className="font-bold">
          {data.slip_type === "single" ? "SINGLE" : "MULTIPLE"}
        </p>
        <p className="text-muted-foreground">{data.created_date}</p>
      </div>
      <div className="text-sm space-y-2 border-t border-border/60 pt-2 mt-2">
        {" "}
        <div className="flex justify-between">
          <p>Events: {data.total}</p>
          <p>
            {data.completed} of {data.total} completed
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-muted-foreground">Odds:</p>
            <p>{round(data.total_odds, 2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground">Bet:</p>
            <p>{round(parseFloat(data.bet_amount), 2)}</p>
          </div>
          {/* <div className="flex justify-between">
            <p className="text-muted">Win/Loss:</p>
            <p>{round(parseFloat(data.win_loss_amount), 2)}</p>
          </div> */}
          <div className="flex justify-between">
            <p className="text-muted-foreground">Status:</p>
            <p className={`${getTextColor(data.bet_status)}`}>
              {data.bet_status} (${data.win_loss_amount})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BetHistory;
