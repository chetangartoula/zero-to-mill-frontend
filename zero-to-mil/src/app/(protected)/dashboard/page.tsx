import DetailWrapper from "@/components/wrapper/detailWrapper";
import { getPageRoutes } from "@/utils/getRoutes";
import React from "react";

function page() {
  return (
    <div>
      <DetailWrapper
        title="Account Settings"
        navigationLink={getPageRoutes("login")}
      >
        testpage
      </DetailWrapper>
    </div>
  );
}

export default page;
