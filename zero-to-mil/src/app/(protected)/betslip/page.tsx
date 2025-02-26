"use client";
import SlipCards from "@/components/base/card/SlipCards";
import OddList from "@/components/custom/betSlip/OddList";
import MobileTopNav from "@/components/navigation/MobileTopnav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAppMutation, useAppQuery } from "@/lib/api";
import { useAppStore } from "@/store";
import { BetSlipProps } from "@/types/base/betslip";

const defaultData = {
  slip_type: "",
  slips: [],
  total_odds: 0,
};

export default function BetSlip() {
  const { toast } = useToast();
  const { numberOfSlips, setSlip } = useAppStore((state) => state);
  const { data = defaultData, refetch } = useAppQuery<{
    slip_type: string;
    slips: BetSlipProps[];
    total_odds: number;
  }>({
    routeName: "betSlip",
    queryKey: ["betSlip"],
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data?.slips && data.slips.length !== numberOfSlips) {
        setSlip(data.slips.length);
      }
    },
  });

  const { mutate } = useAppMutation(
    "deleteBet",
    {
      onSuccess: async (data: { error_message: string }) => {
        setSlip(Math.max(0, numberOfSlips - 1));
        toast({
          title: "Bet removed",
          description: "Bet has been removed from your slip",
          variant: "success",
        });
        await refetch();
      },
      onError: async (data: string) => {
        toast({
          title: "Error",
          description: data.toString(),
          variant: "success",
        });
        await refetch();
      },
    },
    {
      modifier: (data) => data,
      method: "DELETE",
    }
  );

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
              disabled={data?.slip_type === "multiple"}
            >
              Single
            </TabsTrigger>
            <TabsTrigger
              value="multiple"
              className="relative flex-grow rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-haravara data-[state=active]:text-foreground data-[state=active]:shadow-none "
              disabled={data?.slip_type === "single"}
            >
              Multiple
            </TabsTrigger>
          </TabsList>
          <TabsContent value="single">
            {data.slips && (
              <SlipCards
                data={data?.slips && (data?.slips[0] as BetSlipProps)}
                onCancel={(data) => mutate({ id: data.sport_id })}
              />
            )}
          </TabsContent>
          <TabsContent value="multiple">
            <>
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
          isDisabled={Object.keys(data).length === 0}
        />
      </div>
    </div>
  );
}
