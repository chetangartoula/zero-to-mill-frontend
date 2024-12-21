import { cn } from "@/lib/utils";
import React from "react";

export function TransactionHistorySkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("bg-input p-4 animate-pulse", className)}>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="text-sm space-y-2 border-t border-muted pt-2 mt-2">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
