"use client";
import BetCard from "@/components/base/card/BetCard";
import NavCarousel from "@/components/base/carousel/NavCarousel";
import MobileTopNav from "@/components/navigation/MobileTopnav";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppQuery } from "@/lib/api";
import { CarouselData, MenuItemsSuccessResponse, OddList } from "@/types/base";
import React, { useMemo, useState } from "react";

function DashBoard() {
  const { data: sportsLists } = useAppQuery<
    MenuItemsSuccessResponse["responseData"]
  >({
    routeName: "menu-items",
    queryKey: ["menu-items"],
    retry: false,
    refetchOnWindowFocus: false,
  });
  const finalTabData = useMemo(
    () =>
      sportsLists?.map((sportList) => {
        return {
          name: sportList.name,
          value: sportList.key,
          key: sportList.key,
          logo_url: sportList.logo_url,
        };
      }) || [],
    [sportsLists]
  );
  const [sportsKey, setSportsKey] = useState<string | null>(
    finalTabData[0]?.key
  );
  const { messages: oddList } = useWebSocket<OddList>("odds_list", {});

  return (
    <div>
      <div className="w-full">
        <MobileTopNav />
      </div>
      <div className="w-full p-2 bg-navbackground">
        <NavCarousel
          data={finalTabData as CarouselData[]}
          onClick={(data) => console.log("data", data)}
        />
      </div>
      <BetCard data={oddList} />
    </div>
  );
}

export default DashBoard;
