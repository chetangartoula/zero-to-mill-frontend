"use client";
import AppForm from "@/components/base/form/AppForm";
import InputFormField from "@/components/formfields/InputFormField";
import { Button } from "@/components/ui/button";
import AuthWrapper from "@/components/wrapper/authWrapper";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { forgotPasswordSchema } from "@/schemas/auth";
import React from "react";

function ForgotPassword() {
  return (
    <AuthWrapper
      title="Forgot Password"
      wrapperProps={{
        className: "relative top-20",
      }}
    >
      <AppForm
        defaultValues={{ email: "" }}
        schema={forgotPasswordSchema}
        onSubmit={(data) => console.log(data)}
      >
        <FormContentWrapper>
          <InputFormField name="email" label="Email" />
        </FormContentWrapper>

        <Button size={"full"}>Reset Password</Button>
      </AppForm>
    </AuthWrapper>
  );
}

export default ForgotPassword;
