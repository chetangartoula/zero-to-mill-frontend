import { cn } from "@/lib/utils";
import { TransactionHistoryApiProps } from "@/types/base/history";
import { round } from "lodash";
import React from "react";

export interface TransactionHistoryProps {
  key: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  data: TransactionHistoryApiProps;
}

const getTextColor = (status: string) => {
  switch (status) {
    case "load":
      return "text-haravara";
    default:
      return "text-destructive";
  }
};

function BetHistory({
  className,
  onClick,
  data,
  key,
}: TransactionHistoryProps) {
  return (
    <div
      key={key}
      className={cn("bg-input p-4 mb-2", className)}
      onClick={onClick}
    >
      <div className="flex justify-between">
        <p>{data.txn_date.split("T")[0]}</p>
        <p>${round(data.amount, 2)}</p>
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
            <p>{data.deposit_method}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted">Name</p>
            <p>{data.name}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted">Type:</p>
            <p className={`${getTextColor(data.type)}`}>
              {data.type === "load" ? "Deposit" : "WithDraw"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BetHistory;
