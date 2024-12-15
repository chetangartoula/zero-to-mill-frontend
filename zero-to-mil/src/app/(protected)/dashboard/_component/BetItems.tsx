import { useWebSocket } from "@/hooks/useWebSocket";
import { cn } from "@/lib/utils";
import { OddList } from "@/types/base";
import React from "react";

function BetItems({ itemKey }: { itemKey: string }) {
  //   const { messages: oddList } = useWebSocket<OddList>("odds_list", {
  //     filters: { sport_key: "americanfootball_ncaaf" },
  //   });

  const oddList = {
    sport_key: "americanfootball_ncaaf",
    sport_title: "NCAAF",
    commence_time: "2022-09-03T00:00:00Z",
    home_team: "Ohio State Buckeyes",
    away_team: "Michigan Wolverines",
    bookmaker: {
      key: "bet365",
      title: "Bet365",
      last_update: "2022-09-03T00:00:00Z",
      markets: [
        {
          key: "moneyline",
          outcomes: [
            {
              name: "Ohio State Buckeyes",
              point: 1.5,
            },
            {
              name: "Michigan Wolverines",
              point: 2.5,
            },
          ],
        },
        {
          key: "spread",
          outcomes: [
            {
              name: "Ohio State Buckeyes",
              point: 1.5,
            },
            {
              name: "Michigan Wolverines",
              point: 2.5,
            },
          ],
        },
        {
          key: "totals",
          outcomes: [
            {
              name: "Over",
              point: 1.5,
            },
            {
              name: "Under",
              point: 2.5,
            },
          ],
        },
      ],
    },
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div
        className={cn("flex-column text-s bg-betcard border rounded m-4 p-4 ")}
      >
        <div className="flex gap-2 justify-between w-full px-4">
          <div className="border">{oddList.home_team}</div>
          <div className="font-bold">VS</div>
          <div className="text-end">{oddList.away_team}</div>
        </div>
        <p className="text-center mt-2 text-s text-greyf">
          {oddList.commence_time}
        </p>
        {oddList.bookmaker?.markets?.map((item, index) => (
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
                <p className="bg-subinput py-3 rounded">{outcome.point}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BetItems;
