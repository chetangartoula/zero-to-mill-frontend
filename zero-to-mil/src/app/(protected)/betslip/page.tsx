"use client";
import SlipCards from "@/components/base/card/SlipCards";
import OddList from "@/components/custom/betSlip/OddList";
import MobileTopNav from "@/components/navigation/MobileTopnav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppMutation, useAppQuery } from "@/lib/api";
import { BetSlipProps } from "@/types/base/betslip";
import { toast } from "sonner";

const defaultData = {
  slip_type: "",
  slips: [],
  total_odds: 0,
};

export default function BetSlip() {
  const { data = defaultData, refetch } = useAppQuery<{
    slip_type: string;
    slips: BetSlipProps[];
    total_odds: number;
  }>({
    routeName: "betSlip",
    queryKey: ["betSlip"],
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { mutate } = useAppMutation(
    "deleteBet",
    {
      onSuccess: async (data: { error_message: string }) => {
        toast.success(data?.error_message);
        await refetch();
      },
      onError: async (data: string) => {
        toast.error(data);
        await refetch();
      },
    },
    {
      modifier: (data) => data,
      method: "DELETE",
    }
  );

  const isSingleTabDisabled =
    (data?.slips && data.slips.length < 1) || Object.keys(data).length === 0;
  const isMultipleTabDisabled =
    (data?.slips && data?.slips.length >= 1) || Object.keys(data).length === 0;

  return (
    <div className="flex flex-col min-h-screen ">
      <MobileTopNav />
      {data?.slips && data?.slips?.length < 1 ? (
        <div className="flex-1 flex justify-center items-center">
          <div className="p-2">
            <p className="text-sm text-red-500 text-center">
              No bet placed yet
            </p>
          </div>
          {/* <Button>Place Bet</Button> */}
        </div>
      ) : (
        <Tabs
          defaultValue={
            data?.slips && data.slips.length === 1 ? "single" : "multiple"
          }
          className="relative mr-auto w-full mt-1"
        >
          <TabsList className="w-full flex justify-start rounded-none border-b bg-transparent p-0 ">
            <TabsTrigger
              value="single"
              className="relative flex-grow rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-haravara data-[state=active]:text-foreground data-[state=active]:shadow-none "
              disabled={isSingleTabDisabled}
            >
              Single
            </TabsTrigger>
            <TabsTrigger
              value="multiple"
              className="relative flex-grow rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-haravara data-[state=active]:text-foreground data-[state=active]:shadow-none "
              disabled={isMultipleTabDisabled}
            >
              Multiple
            </TabsTrigger>
          </TabsList>
          <TabsContent value="single">
            {/* {isMultipleTabDisabled && data.slip_type === "single" && (
              <div className="flex-1 flex justify-center items-center">
                <div className="p-2">
                  <p className="text-sm text-red-500 text-center">
                    No bet placed yet
                  </p>
                </div>
              </div>
            )} */}
            {data.slips && (
              <SlipCards
                data={data?.slips && (data?.slips[0] as BetSlipProps)}
                onCancel={(data) => mutate({ id: data.sport_id })}
              />
            )}
          </TabsContent>
          <TabsContent value="multiple">
            <>
              {/* {isSingleTabDisabled && data.slip_type === "multiple" && (
                <div className="flex-1 flex justify-center items-center">
                  <div className="p-2">
                    <p className="text-sm text-red-500 text-center">
                      No bet placed yet
                    </p>
                  </div>
                </div>
              )} */}
              {data?.slips &&
                data.slips.map((slip, index) => (
                  <SlipCards
                    key={index}
                    data={slip}
                    onCancel={(data) => mutate({ id: data.sport_id })}
                  />
                ))}
            </>
          </TabsContent>
        </Tabs>
      )}

      <div className="flex-grow"></div>

      <div className="bg-menu pt-4 sticky bottom-0">
        <OddList
          total_odds={data.total_odds}
          isDisabled={isMultipleTabDisabled && isSingleTabDisabled}
        />
      </div>
    </div>
  );
}
