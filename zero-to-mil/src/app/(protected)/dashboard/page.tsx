"use client";
import BetCard from "@/components/base/card/BetCard";
import NavCarousel from "@/components/base/carousel/NavCarousel";
import MobileTopNav from "@/components/navigation/MobileTopnav";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppQuery } from "@/lib/api";
import { CarouselData, MenuItemsSuccessResponse, OddList } from "@/types/base";
import React, { useEffect, useMemo, useState } from "react";

function DashBoard() {
  const { data: sportsLists } = useAppQuery<
    MenuItemsSuccessResponse["responseData"]
  >({
    routeName: "menu-items",
    queryKey: ["menu-items"],
    retry: false,
    refetchOnWindowFocus: false,
  });

  const [sportsKey, setSportsKey] = useState<string | null>(
    "american_football"
  );

  const finalTabData = useMemo(
    () =>
      sportsLists?.map((sportList) => {
        return {
          name: sportList.name,
          value: sportList.sport_key,
          key: sportList.sport_key,
          logo_url: sportList.logo_url,
        };
      }) || [],
    [sportsLists]
  );

  useEffect(() => {
    if (sportsKey === null) setSportsKey(finalTabData[0]?.key);
  }, [finalTabData, sportsKey]);

  const { messages: oddList } = useWebSocket<OddList>("odds_list", {
    filters: { sport_key: sportsKey || "" },
  });

  console.log("oddList", oddList);

  return (
    <div>
      <div className="w-full">
        <MobileTopNav />
      </div>
      <div className="w-full p-2 bg-navbackground">
        <NavCarousel
          data={finalTabData as CarouselData[]}
          onClick={(data) => setSportsKey(data.key)}
          isactive={sportsKey || ""}
        />
      </div>
      <BetCard data={oddList} />
    </div>
  );
}

export default DashBoard;
