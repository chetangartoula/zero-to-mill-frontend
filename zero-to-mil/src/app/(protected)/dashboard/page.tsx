"use client";
import MobileTopNav from "@/components/navigation/MobileTopnav";
import { useAppQuery } from "@/lib/api";
import {
  BannerSuccessResponse,
  BetSlipProps,
  CarouselData,
  MenuItems,
  MenuItemsSuccessResponse,
  OddList,
} from "@/types/base";
import React, { useEffect, useMemo } from "react";
import AccordionList from "./_component/AccordionList";
import { useAppStore } from "@/store";
import { NavCarousel } from "@/components/base/carousel";
import { NavCarouselSkeleton } from "@/components/skeletons/NavCarouselSkeleton";
import { AccordionListSkeleton } from "@/components/skeletons";
import BannerCarousel from "@/components/base/carousel/BannerCarousel";
import BannerCarouselSkeleton from "@/components/base/carousel/BannerCarouselSkeleton";

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

  const { data: bannerData, isLoading } = useAppQuery<
    BannerSuccessResponse["responseData"]
  >({
    routeName: "banners",
    queryKey: ["banners"],
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { data } = useAppQuery<{
    slip_type: string;
    slips: BetSlipProps[];
    total_odds: number;
  }>({
    routeName: "betSlip",
    queryKey: ["betSlip"],
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
    return;
  }, [finalTabData, activeTabKey, setActiveTabKey]);

  const betList = useMemo(
    () => sportsLists?.find((item) => item.sport_key === activeTabKey),
    [sportsLists, activeTabKey]
  );

  return (
    <div className="mb-10 pb-10">
      <div className="w-full mb-3">
        <MobileTopNav />
      </div>

      <div className="px-3 sm:px-6 space-y-4">
        <div className="w-full rounded-2xl border border-border/60 bg-navbackground/70 backdrop-blur-sm p-2 shadow-sm">
          {isSportsLoading || isSportsFetching ? (
            <NavCarouselSkeleton />
          ) : (
            <NavCarousel
              data={finalTabData as CarouselData[]}
              onClick={(data) => setActiveTabKey(data.key)}
              isactive={activeTabKey || ""}
            />
          )}
        </div>

        {isLoading ? (
          <BannerCarouselSkeleton />
        ) : (
          <BannerCarousel data={bannerData || []} />
        )}

        {activeSportKey && (isSportsLoading || isSportsFetching) ? (
          <div className="pt-4">
            <AccordionListSkeleton />
          </div>
        ) : (
          <AccordionList
            data={betList?.data as MenuItems["data"]}
            activeSlip={data?.slips || []}
          />
        )}
      </div>
    </div>
  );
}

export default DashBoard;
