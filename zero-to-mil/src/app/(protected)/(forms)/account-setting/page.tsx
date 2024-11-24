"use client";
import AppForm from "@/components/base/form/AppForm";
import InputFormField from "@/components/formfields/InputFormField";
import { Button } from "@/components/ui/button";
import DetailWrapper from "@/components/wrapper/detailWrapper";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { useAppMutation } from "@/lib/api";
import { AccountSettingsSchema } from "@/schemas/account-settings";
import { useLayoutStore } from "@/store/slices/layoutState";
import React from "react";
import { toast } from "sonner";

function AccountSetting() {
  const initialValues = {
    email: "",
    password: "",
    username: "",
  };
  const { width, isMobile } = useLayoutStore((state) => state);
  console.log("width", width, isMobile);
  const { mutate } = useAppMutation("accountSettings", {
    onSuccess: async () => {
      toast.success("OTP verification successful");
    },
  });
  return (
    <DetailWrapper title="Account Settings" navigationLink={"menu"}>
      <AppForm
        defaultValues={initialValues}
        schema={AccountSettingsSchema}
        onSubmit={(data) => mutate(data)}
      >
        <FormContentWrapper>
          <InputFormField name="email" label="Email" />
          <InputFormField name="password" label="Password" />
          <InputFormField name="username" label="Username" />
          <Button type="submit" size={"full"}>
            Submit
          </Button>
        </FormContentWrapper>
      </AppForm>
    </DetailWrapper>
  );
}

export default AccountSetting;
