import { useWebSocket } from "@/hooks/useWebSocket";
import { cn } from "@/lib/utils";
import { OddList } from "@/types/base";
import React from "react";

function BetItems({ itemKey }: { itemKey: string }) {
  const { messages: oddList } = useWebSocket<OddList[]>("odds_list", {
    filters: { sport_key: itemKey },
  });
  return (
    <div onClick={(e) => e.stopPropagation()}>
      {oddList &&
        oddList?.map((odds, index) => (
          <div
            className={cn(
              "flex-column text-s bg-betcard border rounded m-4 p-4 "
            )}
            key={index}
          >
            <div className="flex gap-2 justify-between w-full px-4">
              <div className="border">{odds?.home_team}</div>
              <div className="font-bold">VS</div>
              <div className="text-end">{odds?.away_team}</div>
            </div>
            <p className="text-center mt-2 text-s text-greyf">
              {odds?.commence_time}
            </p>
            {odds?.bookmaker?.markets?.map((item, index) => (
              <div
                className={cn(
                  "flex justify-between align-center gap-6 pl-2 text-s"
                )}
                key={`${item.key}_${index}`}
              >
                {item.outcomes?.map((outcome, index) => (
                  <div
                    className={cn("flex-column text-center w-full")}
                    key={`${outcome.name}_${index}`}
                  >
                    <p className="p-2">{outcome.name}</p>
                    <p className="bg-subinput py-3 rounded">
                      {outcome.point || outcome.price}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

export default BetItems;
