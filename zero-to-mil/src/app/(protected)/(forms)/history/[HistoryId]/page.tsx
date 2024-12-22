import React from "react";
import SlipCards from "@/components/base/card/SlipCards";
import DetailWrapper from "@/components/wrapper/detailWrapper";
import { getPageRoutes } from "@/utils/getRoutes";
import { TransactionHistory } from "@/components/custom/history";

function TransactionHistoryDetails() {
  return (
    <DetailWrapper
      title="Bet Details"
      navigationLink={getPageRoutes("transaction-history")}
      enablePadding={false}
    >
      <div>
        {/* <TransactionHistory /> */}
        <div className="mt-4 mx-4">
          <SlipCards className={"rounded"} />
        </div>
      </div>
    </DetailWrapper>
  );
}

export default TransactionHistoryDetails;
