import React from "react";
import TransactionHistory from "../_components/TransactionHistory";
import SlipCards from "@/components/base/card/SlipCards";
import DetailWrapper from "@/components/wrapper/detailWrapper";
import { getPageRoutes } from "@/utils/getRoutes";

function TransactionHistoryDetails() {
  return (
    <DetailWrapper
      title="Bet Details"
      navigationLink={getPageRoutes("transaction-history")}
      enablePadding={false}
    >
      <div>
        <TransactionHistory />
        <div className="mt-4 mx-4">
          <SlipCards className={"rounded"} />
        </div>
      </div>
    </DetailWrapper>
  );
}

export default TransactionHistoryDetails;
