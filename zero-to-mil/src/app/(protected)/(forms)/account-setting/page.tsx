"use client";
import {
  ChangeMPINForm,
  ChangePasswordFrom,
  SetMPINForm,
} from "@/components/custom/accountSetting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DetailWrapper from "@/components/wrapper/detailWrapper";
import { useAppStore } from "@/store";
import { useLayoutStore } from "@/store/slices/layoutState";
import { getPageRoutes } from "@/utils/getRoutes";
import React from "react";

function AccountSetting() {
  // const { width, isMobile } = useLayoutStore((state) => state);
  const { is_mpin_set } = useAppStore((state) => state);

  return (
    <DetailWrapper
      title="Account Settings"
      navigationLink={getPageRoutes("menu")}
      enablePadding={false}
    >
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
          {is_mpin_set ? <ChangeMPINForm /> : <SetMPINForm />}
        </TabsContent>
      </Tabs>
    </DetailWrapper>
  );
}

export default AccountSetting;
