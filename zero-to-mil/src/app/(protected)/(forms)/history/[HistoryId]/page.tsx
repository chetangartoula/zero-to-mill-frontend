"use client";
import React, { useMemo } from "react";
import DetailWrapper from "@/components/wrapper/detailWrapper";
import { getPageRoutes } from "@/utils/getRoutes";
import { useAppQuery } from "@/lib/api";
import SlipCards from "@/components/base/card/SlipCards";
import { BetHistory } from "@/components/custom/history";
import {
  BetHistoryApiProps,
  BetHistoryDetailsApiProps,
} from "@/types/base/history";

function TransactionHistoryDetails({
  params,
}: {
  params: { HistoryId: string };
}) {
  const { data, isLoading } = useAppQuery<BetHistoryDetailsApiProps>({
    routeName: "betDetails",
    queryKey: ["betDetails", { id: "1" }],
    refetchOnWindowFocus: false,
    enabled: !!params.HistoryId,
    requestConfig: {
      modifier: {
        id: params.HistoryId,
      },
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <DetailWrapper
      title="Bet Details"
      navigationLink={getPageRoutes("history")}
      enablePadding={false}
    >
      <div>
        <BetHistory
          data={data as BetHistoryApiProps}
          key={data?.slip_id || "bet-history"}
        />
        <div className="mt-4 mx-4">
          {data?.bet_slips?.map((slip, index) => (
            <SlipCards
              className={"rounded"}
              key={slip.match_title}
              data={slip}
            />
          ))}
        </div>
      </div>
    </DetailWrapper>
  );
}

export default TransactionHistoryDetails;
