"use client";
import AppForm from "@/components/base/form/AppForm";
import InputFormField from "@/components/formfields/InputFormField";
import { Button } from "@/components/ui/button";
import AuthWrapper from "@/components/wrapper/authWrapper";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { useAppMutation } from "@/lib/api";
import { forgotPasswordSchema } from "@/schemas/auth";
import { BaseApiResponse } from "@/types/global";
import React from "react";
import { toast } from "sonner";

function ForgotPassword() {
  const { mutate } = useAppMutation("otp", {
    onSuccess: async (data: BaseApiResponse<{ success: string }>) => {
      toast.success(
        data?.responseData?.success.toString() || "OTP sent successfully"
      );
    },
    onError: (error: string) => {
      toast.error(error.toString());
    },
  });
  return (
    <AuthWrapper
      title="Forgot Password"
      wrapperProps={{
        className:
          "relative sm:top-20 md:top-20 lg:top-0 xl:top-0 2xl:top-0 m-4",
      }}
    >
      <AppForm
        defaultValues={{ user_identity: "" }}
        schema={forgotPasswordSchema}
        onSubmit={(data, form) => {
          mutate(data);
          form.reset();
        }}
      >
        <FormContentWrapper>
          <InputFormField name="user_identity" label="Email/Username" />
        </FormContentWrapper>

        <Button size={"full"}>Reset Password</Button>
      </AppForm>
    </AuthWrapper>
  );
}

export default ForgotPassword;
