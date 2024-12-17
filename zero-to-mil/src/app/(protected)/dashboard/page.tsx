"use client";
import BetCard from "@/components/base/card/BetCard";
import NavCarousel from "@/components/base/carousel/NavCarousel";
import MobileTopNav from "@/components/navigation/MobileTopnav";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppQuery } from "@/lib/api";
import {
  CarouselData,
  MenuItems,
  MenuItemsSuccessResponse,
  OddList,
} from "@/types/base";
import React, { useEffect, useMemo } from "react";
import AccordionList from "./_component/AccordionList";
import { useAppStore } from "@/store";

function DashBoard() {
  const { activeTabKey, setActiveTabKey, activeSportKey } = useAppStore(
    (state) => state
  );

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
          value: sportList.sport_key,
          key: sportList.sport_key,
          logo_url: sportList.logo_url,
        };
      }) || [],
    [sportsLists]
  );

  useEffect(() => {
    if (activeTabKey === null && finalTabData[0]?.key) {
      setActiveTabKey(finalTabData[0]?.key);
    }
  }, [finalTabData, activeTabKey, setActiveTabKey]);

  const betList = useMemo(
    () => sportsLists?.find((item) => item.sport_key === activeTabKey),
    [sportsLists, activeTabKey]
  );

  return (
    <div>
      <div className="w-full">
        <MobileTopNav />
      </div>
      <div className="w-full p-2 bg-navbackground">
        <NavCarousel
          data={finalTabData as CarouselData[]}
          onClick={(data) => setActiveTabKey(data.key)}
          isactive={activeTabKey || ""}
        />
      </div>
      <AccordionList data={betList?.data as MenuItems["data"]} />
    </div>
  );
}

export default DashBoard;
