import NavCarouselItem from "@/components/base/carousel";
import DetailWrapper from "@/components/wrapper/detailWrapper";
import { carouseldata } from "@/constants/data/carouseldata";
import { getPageRoutes } from "@/utils/getRoutes";
import React from "react";

function page() {
  return (
    <div>
      <DetailWrapper
        title="Account Settings"
        navigationLink={getPageRoutes("login")}
      >
        <div className="w-full">
          <NavCarouselItem data={carouseldata} />
        </div>
      </DetailWrapper>
    </div>
  );
}

export default page;
