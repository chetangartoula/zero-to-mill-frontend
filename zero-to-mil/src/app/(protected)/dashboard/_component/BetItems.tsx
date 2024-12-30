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
