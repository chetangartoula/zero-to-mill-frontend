import { BetItemsSkeleton } from "@/app/(protected)/dashboard/_component/BetItemsSkeleton";
import React from "react";

export function AccordionListSkeleton() {
  return (
    <div className="space-y-4 animate-pulse mt-4">
      <div className="border border-border/60 rounded-2xl bg-card/70 p-4 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-muted/70 rounded-full"></div>
          <div className="flex-1 h-4 bg-muted/70 rounded"></div>
        </div>
        {/* <BetItemsSkeleton /> */}
        {/* <div className="mt-4 space-y-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-14 bg-gray-300 rounded"></div>
          ))}
        </div> */}
      </div>
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="border border-border/60 rounded-2xl bg-card/70 p-4 shadow-sm"
        >
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-muted/70 rounded-full"></div>
            <div className="flex-1 h-4 bg-muted/70 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
