"use client";
import BetCard from "@/components/base/card/BetCard";
import NavCarousel from "@/components/base/carousel/NavCarousel";
import MobileTopNav from "@/components/navigation/MobileTopnav";
import { useWebSocket } from "@/hooks/useWebSocket";
import { CarouselData, TabData } from "@/types/base";
import React, { useMemo } from "react";

function DashBoard() {
  const { messages: tabData } = useWebSocket<TabData>("sports");
  const { messages: oddList } = useWebSocket("odds_list");

  const finalTabData = useMemo(
    () =>
      tabData.map((item) => ({
        name: item.title,
        imageUrl: item.imageUrl,
        value: item.key,
      })),
    [tabData]
  );
  console.log("tabData", tabData);
  console.log("oddList", oddList);
  return (
    <div>
      <div className="w-full">
        <MobileTopNav />
      </div>
      <div className="w-full p-2 bg-navbackground">
        <NavCarousel data={finalTabData as CarouselData[]} />
      </div>
      <div className="">
        <BetCard />
      </div>
    </div>
  );
}

export default DashBoard;
