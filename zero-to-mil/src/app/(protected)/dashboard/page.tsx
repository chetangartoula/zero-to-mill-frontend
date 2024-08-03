import MenuCards from "@/components/base/card/menuCards";
import NavCarouselItem from "@/components/base/carousel";
import MobileTopNav from "@/components/navigation/MobileTopnav";
import DetailWrapper from "@/components/wrapper/detailWrapper";
import { carouseldata } from "@/constants/data/carouseldata";
import { getPageRoutes } from "@/utils/getRoutes";
import { StarIcon } from "lucide-react";
import React from "react";

function page() {
  return (
    <div>
      <DetailWrapper
        title="Account Settings"
        navigationLink={getPageRoutes("login")}
      >
        <div className="w-full my-2">
          <MobileTopNav />
        </div>
        <div className="w-full">
          <NavCarouselItem data={carouseldata} />
        </div>
        <div className="mt-3 w-full">
          <MenuCards title="Profile" icon={StarIcon} />
        </div>
      </DetailWrapper>
    </div>
  );
}

export default page;
