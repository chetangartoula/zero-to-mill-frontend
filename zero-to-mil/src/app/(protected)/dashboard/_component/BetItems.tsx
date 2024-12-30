import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppMutation } from "@/lib/api";
import { cn } from "@/lib/utils";
import { OddList } from "@/types/base";
import { BetSlipProps } from "@/types/base/betslip";
import { isString } from "lodash";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { BetItemsSkeleton } from "./BetItemsSkeleton";

function BetItems({ itemKey }: { itemKey: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const { messages: oddList } = useWebSocket<OddList[]>("odds_list", {
    filters: { sport_key: itemKey },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [itemKey]);

  const { mutate } = useAppMutation<BetSlipProps>("betSlip", {
    onSuccess: (data) => {
      toast.success("Bet added to slip");
    },
    onError: (error) => {
      isString(error) && toast.error(error);
    },
  });

  if (isLoading || !oddList || oddList?.length === 0) {
    return <BetItemsSkeleton />;
  }

  return (
    <div
      className={`grid ${
        oddList.length <= 2
          ? "grid-cols-1"
          : "grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
      } gap-4`}
      onClick={(e) => e.stopPropagation()}
    >
      {oddList &&
        oddList?.map((odds, index) => (
          <div
            className={cn(
              "flex-column text-s bg-betcard border rounded m-4 p-4 "
            )}
            key={index}
          >
            {odds?.home_team && odds?.away_team && (
              <div className="grid grid-cols-[1fr,auto,1fr] gap-2 w-full px-2 sm:px-4 items-center">
                <div className="border rounded p-2 text-sm sm:text-base truncate">
                  {odds?.home_team}
                </div>
                <div className="font-bold text-xs sm:text-sm px-1">VS</div>
                <div className="border rounded p-2 text-sm sm:text-base truncate text-end">
                  {odds?.away_team}
                </div>
              </div>
            )}

            <p className="text-center mt-2 text-s text-greyf">
              {odds?.commence_time}
            </p>

            {odds?.bookmaker?.markets?.map((item, index) => (
              <div
                className="grid auto-cols-fr gap-2 px-2 py-4"
                style={{
                  gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 100px), 1fr))`,
                }}
                key={`${item.key}_${index}`}
              >
                {item.outcomes?.map((outcome, index) => (
                  <div
                    className="flex flex-col items-center justify-between bg-betcard rounded p-2 hover:bg-opacity-80 transition-all cursor-pointer flex-1"
                    key={`${outcome.name}_${index}`}
                    onClick={() =>
                      mutate({
                        sport_id: odds.id,
                        sport_key: odds.sport_key,
                        sport_title: odds.sport_title,
                        home_team: odds.home_team,
                        away_team: odds.away_team,
                        bookmaker_key: odds.bookmaker?.key,
                        selected_team: outcome.name,
                        odds: outcome.point || outcome.price,
                        market_key: item.key,
                      })
                    }
                  >
                    <p className="text-sm text-center mb-2 break-words w-full">
                      {outcome.name}
                    </p>
                    <p className="bg-subinput py-2 px-4 rounded w-full text-center">
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
