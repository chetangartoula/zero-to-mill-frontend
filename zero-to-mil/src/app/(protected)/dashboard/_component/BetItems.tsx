import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppMutation } from "@/lib/api";
import { cn } from "@/lib/utils";
import { OddList } from "@/types/base";
import { BetSlipProps } from "@/types/base/betslip";
import { isString } from "lodash";
import React, { useEffect, useState } from "react";
import { BetItemsSkeleton } from "./BetItemsSkeleton";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { getPageRoutes } from "@/utils/getRoutes";
import { useAppStore } from "@/store";
import { format } from "date-fns-tz";
import { parseISO } from "date-fns";

function BetItems({ itemKey }: { itemKey: string }) {
  const router = useRouter();
  const { numberOfSlips, setSlip } = useAppStore((store) => store);
  const [isLoading, setIsLoading] = useState(true);
  const { messages: oddList } = useWebSocket<OddList[]>("odds_list", {
    filters: { sport_key: itemKey },
  });
  const { toast: htoast } = useToast();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [itemKey]);

  const { mutate } = useAppMutation<BetSlipProps>("betSlip", {
    onSuccess: () => {
      setSlip(numberOfSlips + 1);
      htoast({
        title: "Bet added to slip",
        description: "You can view your slip by clicking the button below",
        variant: "success",
        duration: 1000,
        action: (
          <Button
            onClick={() => router.push(getPageRoutes("betslip"))}
            variant="white"
          >
            View Slip
          </Button>
        ),
      });
    },
    onError: (error) => {
      isString(error) &&
        htoast({
          title: "Error",
          description: error,
          variant: "destructive",
          duration: 5000,
        });
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
          : "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      } gap-4`}
      onClick={(e) => e.stopPropagation()}
    >
      {oddList &&
        oddList?.map((odds, index) => (
          <div
            className={cn(
              "flex-column text-xs bg-secondrybetcard border rounded mx-2"
            )}
            key={index}
          >
            {odds?.home_team && odds?.away_team && (
              <div className="grid grid-cols-[1fr,auto,1fr] gap-2 w-full px-2 sm:px-2 items-center">
                <div className="rounded p-2 text-xs sm:text-xs truncate text-end">
                  {odds?.home_team}
                </div>
                <div className="font-bold text-xs sm:text-sm px-1 border">
                  VS
                </div>
                <div className="rounded p-2 text-xs sm:text-xs truncate text-start">
                  {odds?.away_team}
                </div>
              </div>
            )}

            <p className="text-center mt-1 text-xs text-greyf">
              {format(
                parseISO(odds?.commence_time || odds?.bookmaker?.last_update),
                "dd/MM/yyyy HH:mm",
                { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }
              )}
            </p>

            {odds?.bookmaker?.markets?.map((item, index) => (
              <div
                className="grid auto-cols-fr gap-2 px-1 py-2 "
                style={{
                  gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${
                    odds.home_team ? "50px" : "100px"
                  }), 1fr))`,
                }}
                key={`${item.key}_${index}`}
              >
                {item.outcomes
                  ?.sort((a, b) => {
                    const getOrder = (name: string) => {
                      if (name === odds.home_team) return 1;
                      if (name === "Draw") return 2;
                      if (name === odds.away_team) return 3;
                      return 4;
                    };

                    return getOrder(a.name) - getOrder(b.name);
                  })
                  .map((outcome, index) => (
                    <div
                      className="flex flex-col items-center justify-between bg-bg-secondrybetcard  rounded p-1 hover:bg-opacity-80 transition-all cursor-pointer flex-1"
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
                      <p className="text-xs text-center mb-1 break-words w-full text-greyf">
                        {outcome.name === odds.home_team
                          ? "1"
                          : outcome.name === odds.away_team
                          ? "2"
                          : outcome.name === "Draw"
                          ? "X"
                          : outcome.name}
                      </p>
                      <p className="bg-pointinput py-2 px-4 rounded w-full text-center text-sm font-semibold">
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
