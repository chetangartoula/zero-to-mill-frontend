"use client";
import {
  ChangeMPINForm,
  ChangePasswordFrom,
  SetMPINForm,
} from "@/components/custom/accountSetting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLayoutStore } from "@/store/slices/layoutState";
import React from "react";

function AccountSetting() {
  const { width, isMobile } = useLayoutStore((state) => state);
  console.log("width", width, isMobile);

  return (
    <Tabs defaultValue="password" className="relative mr-auto w-full">
      <TabsList className="w-full flex justify-start rounded-none border-b bg-transparent p-0 ">
        <TabsTrigger
          value="password"
          className="relative flex-grow rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-haravara data-[state=active]:text-foreground data-[state=active]:shadow-none "
        >
          Change Password
        </TabsTrigger>
        <TabsTrigger
          value="mpin"
          className="relative flex-grow rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-haravara data-[state=active]:text-foreground data-[state=active]:shadow-none "
        >
          Change MPIN
        </TabsTrigger>
      </TabsList>
      <TabsContent value="password">
        <div>
          <ChangePasswordFrom />
        </div>
      </TabsContent>
      <TabsContent value="mpin">
        {true ? <ChangeMPINForm /> : <SetMPINForm />}
      </TabsContent>
    </Tabs>
  );
}

export default AccountSetting;
