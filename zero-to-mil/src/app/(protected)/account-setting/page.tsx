"use client";
import AppForm from "@/components/base/form/AppForm";
import InputFormField from "@/components/formfields/InputFormField";
import { Button } from "@/components/ui/button";
import DetailWrapper from "@/components/wrapper/detailWrapper";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { AccountSettingsSchema } from "@/schemas/account-settings";
import React from "react";

function AccountSetting() {
  const initialValues = {
    email: "",
    password: "",
    username: "",
  };
  return (
    <DetailWrapper title="Account Settings" navigationLink={"test"}>
      <AppForm
        defaultValues={initialValues}
        schema={AccountSettingsSchema}
        onSubmit={(data) => console.log("data", data)}
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
