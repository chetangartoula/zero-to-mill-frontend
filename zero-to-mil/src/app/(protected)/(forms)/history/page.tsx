"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { getPageRoutes } from "@/utils/getRoutes";
import { BetHistory, TransactionHistory } from "@/components/custom/history";
import { useAppQuery } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MobileTopNav from "@/components/navigation/MobileTopnav";
import { TransactionHistoryApiProps } from "@/types/base/history";
import { BetHistoryApiProps } from "@/types/base/history/betHistory";
import { TransactionHistorySkeleton } from "@/components/skeletons";
import { isArray } from "lodash";

function TransactionHistoryList() {
  const router = useRouter();
  const { data: transactionHistory, isLoading: isTransactionHistoryLoading } =
    useAppQuery<TransactionHistoryApiProps[]>({
      routeName: "getTransactionHistory",
      queryKey: ["getTransactionHistory"],
      retry: false,
      refetchOnWindowFocus: false,
    });

  const { data: betHistory, isLoading: isBetHistoryLoading } = useAppQuery<
    BetHistoryApiProps[]
  >({
    routeName: "placeBet",
    queryKey: ["placeBet"],
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="block sm:hidden">
        <MobileTopNav />
      </div>

      <Tabs
        defaultValue="bet_history"
        className="relative mr-auto w-full mt-1 mb-8 pb-8"
      >
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
          {" "}
          {isBetHistoryLoading && (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <TransactionHistorySkeleton key={index} className="mb-4" />
              ))}
            </>
          )}
          {betHistory?.length === 0 && (
            <div className="flex justify-center items-center">
              <p className="text-sm text-red-500 text-center">
                No transaction history yet
              </p>
            </div>
          )}
          <div className="gap-4 p-4">
            {isArray(betHistory) &&
              betHistory?.map((history) => (
                <BetHistory
                  key="1"
                  className="border rounded-xl"
                  data={history || {}}
                  onClick={() =>
                    router.push(
                      getPageRoutes("bet-detail", {
                        HistoryId: history?.slip_id,
                      })
                    )
                  }
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="transaction_history" className="p-4">
          {isTransactionHistoryLoading && (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <TransactionHistorySkeleton key={index} className="mb-4" />
              ))}
            </>
          )}
          {transactionHistory?.length === 0 && (
            <div className="flex justify-center items-center">
              <p className="text-sm text-red-500 text-center">
                No transaction history yet
              </p>
            </div>
          )}
          {transactionHistory?.map((history) => (
            <TransactionHistory
              key={history.txn_id}
              className="border rounded-xl"
              data={history || {}}
            />
          ))}
        </TabsContent>
      </Tabs>
    </>
  );
}

export default TransactionHistoryList;

{
}
