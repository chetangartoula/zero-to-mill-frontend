"use client";
import BetCard from "@/components/base/card/BetCard";
import NavCarousel from "@/components/base/carousel/NavCarousel";
import MobileTopNav from "@/components/navigation/MobileTopnav";
import { carouseldata } from "@/constants/data";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppQuery } from "@/lib/api";
import { CarouselData, OddList, TabData } from "@/types/base";
import React, { useMemo } from "react";

function DashBoard() {
  const { data: sportsList } = useAppQuery({
    routeName: "menu-items",
    queryKey: ["menu-items"],
    retry: false,
    refetchOnWindowFocus: false,
  });
  const { messages: oddList } = useWebSocket<OddList>("odds_list", {});

  console.log("sportsList", sportsList);

  // const finalTabData = useMemo(
  //   () =>
  //     Object.keys(tabData).flatMap((item) => ({
  //       name: item,
  //       imageUrl: tabData[item].imageUrl,
  //       value: tabData[item].sport_key,
  //     })),
  //   [tabData]
  // );

  // console.log(
  //   "obect.map",
  //   Object.keys(tabData).flatMap((item) => tabData[item])
  // );
  // console.log("oddList", oddList);
  return (
    <div>
      <div className="w-full">
        <MobileTopNav />
      </div>
      <div className="w-full p-2 bg-navbackground">
        <NavCarousel data={carouseldata} />
      </div>
      <BetCard data={oddList} />
    </div>
  );
}

export default DashBoard;
