import { cn } from "@/lib/utils";
import { TransactionHistoryApiProps } from "@/types/base/history";
import React from "react";

export interface TransactionHistoryProps {
  key: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  data: TransactionHistoryApiProps;
}

function BetHistory({
  className,
  onClick,
  data,
  key,
}: TransactionHistoryProps) {
  return (
    <div key={key} className={cn("bg-input p-4", className)} onClick={onClick}>
      <div>
        <p>{data.name}</p>
      </div>
      <div className="text-sm space-y-2 border-t border-muted pt-2 mt-2">
        {" "}
        <div className="flex justify-between">
          <p>Events:4</p>
          <p>4 of 4 completed</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-muted">Odds:</p>
            <p>5.6</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted">Bet:</p>
            <p>{`$45`}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted">Status:</p>
            <p className="text-destructive">Lost</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BetHistory;
