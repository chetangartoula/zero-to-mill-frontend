"use client";
import React from "react";
import DetailWrapper from "@/components/wrapper/detailWrapper";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { getPageRoutes } from "@/utils/getRoutes";
import { TransactionHistory } from "@/components/custom/history";
import { useAppQuery } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function TransactionHistoryList() {
  const router = useRouter();
  const { data } = useAppQuery({
    routeName: "getTransactionHistory",
    queryKey: ["getTransactionHistory"],
    retry: false,
    refetchOnWindowFocus: false,
  });
  return (
    <DetailWrapper
      title="Transaction History"
      navigationLink={getPageRoutes("menu")}
    >
      <div className="flex justify-between gap-1">
        <div className="flex-1">
          <p className="text-sm text-cardtitle text-start">Available</p>
          <p className="text-primary text-xl text-start">${455}</p>
        </div>
        <div className="flex-1 text-cardtitle">
          <p className="text-sm text-center">On Stake</p>
          <p className="text-xl text-center">${55}</p>
        </div>
        <div className="flex-1 text-cardtitle">
          <p className="text-sm text-end">Lein</p>
          <p className="text-xl text-end">${55}</p>
        </div>
      </div>
      <Separator className="my-2" />

      <Tabs defaultValue="bet_history" className="relative mr-auto w-full">
        <TabsList className="w-full flex justify-start rounded-none border-b bg-transparent p-0 ">
          <TabsTrigger
            value="bet_history"
            className="relative flex-1 flex flex-grow rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-haravara data-[state=active]:text-foreground data-[state=active]:shadow-none "
          >
            Bet History
          </TabsTrigger>
          <TabsTrigger
            value="transaction_history"
            className="relative flex-1 flex flex-grow rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-haravara data-[state=active]:text-foreground data-[state=active]:shadow-none "
          >
            Transaction History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="bet_history">
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
        </TabsContent>
        <TabsContent value="transaction_history">
          {" "}
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
        </TabsContent>
      </Tabs>
    </DetailWrapper>
  );
}

export default TransactionHistoryList;

{
}
