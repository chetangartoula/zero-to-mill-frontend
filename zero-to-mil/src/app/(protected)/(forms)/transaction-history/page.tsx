"use client";
import React from "react";
import TransactionHistory from "./_components/TransactionHistory";
import DetailWrapper from "@/components/wrapper/detailWrapper";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { getPageRoutes } from "@/utils/getRoutes";

function TransactionHistoryList() {
  const router = useRouter();
  return (
    <DetailWrapper
      title="Transaction History"
      navigationLink={getPageRoutes("menu")}
    >
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-cardtitle">Available</p>
          <p className="text-primary text-xl">${455}</p>
        </div>
        <div className="text-cardtitle">
          <p className="text-sm">On Stake</p>
          <p className="text-xl">${55}</p>
        </div>
        <div className="text-cardtitle flex-column">
          <p className="text-sm text-end">Lein</p>
          <p className="text-xl">${55}</p>
        </div>
      </div>
      <Separator className="my-2 mb-6" />
      <div className="">
        <TransactionHistory
          className="border rounded-xl"
          onClick={() =>
            router.push(
              getPageRoutes("transaction-detail", {
                TransactionHistoryId: "1",
              })
            )
          }
        />
      </div>
    </DetailWrapper>
  );
}

export default TransactionHistoryList;
