import AppForm from "@/components/base/form/AppForm";
import InputFormField from "@/components/formfields/InputFormField";
import { Button } from "@/components/ui/button";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { AccountSettingsSchema } from "@/schemas/account-settings";
import React from "react";

type Props = {};

function AccountSetting({}: Props) {
  const initialValues = {
    email: "",
    password: "",
    username: "",
  };
  return (
    <AppForm
      defaultValues={initialValues}
      schema={AccountSettingsSchema}
      onSubmit={(data) => console.log("data", data)}
    >
      <FormContentWrapper>
        <InputFormField name="email" label="Email" />
        <InputFormField name="password" label="Password" />
        <InputFormField name="username" label="Username" />
        <Button type="submit">Submit</Button>
      </FormContentWrapper>
    </AppForm>
  );
}

export default AccountSetting;
