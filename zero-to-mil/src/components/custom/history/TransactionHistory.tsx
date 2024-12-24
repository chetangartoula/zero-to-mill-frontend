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
          <p>Currency</p>
          <p>USD</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-muted">Method:</p>
            <p>Manual</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted">Email</p>
            <p>brian@gmail.com</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted">Type:</p>
            <p className="text-destructive">Deposit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BetHistory;
