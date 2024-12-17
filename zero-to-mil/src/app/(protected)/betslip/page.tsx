"use client";
import SlipCards from "@/components/base/card/SlipCards";
import OddList from "@/components/custom/betSlip/OddList";
import MobileTopNav from "@/components/navigation/MobileTopnav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWebSocket } from "@/hooks/useWebSocket";

export default function TabsDemo() {
  const { messages: data = [] } = useWebSocket<any[]>("odds_list");

  return (
    <div className="flex flex-col min-h-screen ">
      <MobileTopNav />
      {data.length < 1 ? (
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
          defaultValue={data.length === 1 ? "single" : "multiple"}
          className="relative mr-auto w-full mt-1"
        >
          <TabsList className="w-full flex justify-start rounded-none border-b bg-transparent p-0 ">
            <TabsTrigger
              value="single"
              className="relative flex-grow rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-haravara data-[state=active]:text-foreground data-[state=active]:shadow-none "
              disabled={data?.length === 1}
            >
              Single
            </TabsTrigger>
            <TabsTrigger
              value="multiple"
              className="relative flex-grow rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-haravara data-[state=active]:text-foreground data-[state=active]:shadow-none "
              disabled={data?.length > 1}
            >
              Multiple
            </TabsTrigger>
          </TabsList>
          <TabsContent value="single">
            <>
              <SlipCards />
            </>
          </TabsContent>
          <TabsContent value="multiple">
            Multiple accounts settings and configurations.
          </TabsContent>
        </Tabs>
      )}

      <div className="flex-grow"></div>

      <div className="bg-menu pt-4">
        <OddList />
      </div>
    </div>
  );
}
