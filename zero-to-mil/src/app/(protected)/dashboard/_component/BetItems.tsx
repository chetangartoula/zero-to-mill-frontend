import { useWebSocket } from "@/hooks/useWebSocket";
import { cn } from "@/lib/utils";
import { OddList } from "@/types/base";
import React from "react";

function BetItems({ key }: { key: string }) {
  const { messages: oddList } = useWebSocket<OddList>("odds_list", {
    filters: { sport_key: key || "" },
  });
  console.log("oddList", oddList);
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div
        className={cn("flex-column text-s bg-betcard border rounded m-4 p-4 ")}
      >
        <div className="flex gap-2 justify-between w-full px-4">
          <div>FC Barcelona</div>
          <div className="font-bold">VS</div>
          <div>FC Real Madrid</div>
        </div>
        <p className="text-center mt-2 text-s text-greyf">
          6th Feb, 2024 12:45 pm
        </p>
        <div
          className={cn("flex justify-between align-center gap-6 pl-2 text-s")}
        >
          <div className={cn("flex-column text-center w-full")} key={1}>
            <p className="p-2">1</p>
            <p className="bg-subinput py-3 rounded">8.55</p>
          </div>
          <div className={cn("flex-column text-center w-full")} key={2}>
            <p className="p-2">1</p>
            <p className="bg-subinput py-3 rounded">8.55</p>
          </div>
          <div className={cn("flex-column text-center w-full")} key={3}>
            <p className="p-2">1</p>
            <p className="bg-subinput py-3 rounded">8.55</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BetItems;
