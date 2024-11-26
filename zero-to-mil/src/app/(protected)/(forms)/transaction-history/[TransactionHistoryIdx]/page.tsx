import React from "react";
import TransactionHistory from "../_components/TransactionHistory";
import SlipCards from "@/components/base/card/SlipCards";

function TransactionHistoryDetails() {
  return (
    <div>
      <TransactionHistory />
      <div>
        <SlipCards />
      </div>
    </div>
  );
}

export default TransactionHistoryDetails;
