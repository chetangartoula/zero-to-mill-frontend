"use client";
import React from "react";
import AuthWrapper from "@/components/wrapper/authWrapper";
import InputFormField from "@/components/formfields/InputFormField";
import { Button } from "@/components/ui/button";
import { newPasswordSchema } from "@/schemas/auth";
import AppForm from "@/components/base/form/AppForm";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { useAppMutation } from "@/lib/api";

function NewPasswordSetUp() {
  const { mutate } = useAppMutation("resetPassword");
  return (
    <AuthWrapper
      title="Set New Password"
      wrapperProps={{
        className: "relative top-20",
      }}
    >
      <AppForm
        defaultValues={{
          password: "",
          passwordConfirmation: "",
        }}
        schema={newPasswordSchema}
        onSubmit={(data) => mutate(data)}
      >
        <FormContentWrapper>
          {" "}
          <InputFormField name="password" label="Password" type="password" />
          <InputFormField
            name="passwordConfirmation"
            label="Confirm Password"
            type="password"
          />
        </FormContentWrapper>

        <Button size={"full"}>Set New Password</Button>
      </AppForm>
    </AuthWrapper>
  );
}

export default NewPasswordSetUp;
