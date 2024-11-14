import BetCard from "@/components/base/card/BetCard";
import NavCarousel from "@/components/base/carousel/NavCarousel";
import MobileTopNav from "@/components/navigation/MobileTopnav";
import { carouseldata } from "@/constants/data/carouseldata";
import React from "react";

function page() {
  return (
    <div>
      <div className="w-full">
        <MobileTopNav />
      </div>
      <div className="w-full p-2 bg-navbackground">
        <NavCarousel data={carouseldata} />
      </div>
      <div>
        <BetCard />
      </div>
    </div>
  );
}

export default page;
