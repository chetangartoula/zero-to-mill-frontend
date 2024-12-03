"use client";
import BetCard from "@/components/base/card/BetCard";
import NavCarousel from "@/components/base/carousel/NavCarousel";
import MobileTopNav from "@/components/navigation/MobileTopnav";
import { useWebSocket } from "@/hooks/useWebSocket";
import { CarouselData, OddList, TabData } from "@/types/base";
import React, { useMemo } from "react";

function DashBoard() {
  const { messages: tabData } = useWebSocket<TabData>("sports");
  const { messages: oddList } = useWebSocket<OddList>("odds_list");

  const betData = useMemo(
    () =>
      oddList.map((item) => ({
        title: tabData.find((tab) => tab.key === item.sport_key),
        data: item,
      })),
    [oddList]
  );

  const finalTabData = useMemo(
    () =>
      tabData.map((item) => ({
        name: item.title,
        imageUrl: item.imageUrl,
        value: item.key,
      })),
    [tabData]
  );

  console.log("oddList", oddList);
  console.log("finalTabData", tabData);

  return (
    <div>
      <div className="w-full">
        <MobileTopNav />
      </div>
      <div className="w-full p-2 bg-navbackground">
        <NavCarousel data={finalTabData as CarouselData[]} />
      </div>
      {betData.map((item) => (
        <BetCard data={item.data} title={item.title as TabData} />
      ))}
    </div>
  );
}

export default DashBoard;
