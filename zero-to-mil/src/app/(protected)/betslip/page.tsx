import SlipCards from "@/components/base/card/SlipCards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OddList from "./_components/OddList";

export default function TabsDemo() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Tabs defaultValue="single" className="relative mr-auto w-full">
        <TabsList className="w-full flex justify-start rounded-none border-b bg-transparent p-0 ">
          <TabsTrigger
            value="single"
            className="relative flex-grow rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none "
          >
            Single
          </TabsTrigger>
          <TabsTrigger
            value="multiple"
            className="relative flex-grow rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none "
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
      <div className="flex-grow"></div>

      <div className="bg-menu pt-4">
        <OddList />
      </div>
    </div>
  );
}
