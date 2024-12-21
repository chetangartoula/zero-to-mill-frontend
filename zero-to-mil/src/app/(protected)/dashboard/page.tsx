"use client";
import MobileTopNav from "@/components/navigation/MobileTopnav";
import { useAppQuery } from "@/lib/api";
import {
  CarouselData,
  MenuItems,
  MenuItemsSuccessResponse,
} from "@/types/base";
import React, { useEffect, useMemo } from "react";
import AccordionList from "./_component/AccordionList";
import { useAppStore } from "@/store";
import { NavCarousel } from "@/components/base/carousel";
import { NavCarouselSkeleton } from "@/components/skeletons/NavCarouselSkeleton";
import { AccordionListSkeleton } from "@/components/skeletons";

function DashBoard() {
  const { activeTabKey, setActiveTabKey, activeSportKey } = useAppStore(
    (state) => state
  );

  const {
    data: sportsLists,
    isLoading: isSportsLoading,
    isFetching: isSportsFetching,
  } = useAppQuery<MenuItemsSuccessResponse["responseData"]>({
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
        {(isSportsLoading || isSportsFetching) && <NavCarouselSkeleton />}
        <NavCarousel
          data={finalTabData as CarouselData[]}
          onClick={(data) => setActiveTabKey(data.key)}
          isactive={activeTabKey || ""}
        />
      </div>
      {(isSportsLoading || isSportsFetching) && (
        <div className="pt-4">
          <AccordionListSkeleton />
        </div>
      )}
      <AccordionList data={betList?.data as MenuItems["data"]} />
    </div>
  );
}

export default DashBoard;
