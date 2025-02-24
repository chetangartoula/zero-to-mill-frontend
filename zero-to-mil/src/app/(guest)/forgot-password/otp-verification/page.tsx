"use client";
import AppForm from "@/components/base/form/AppForm";
import OTPFormField from "@/components/formfields/OTPFormField";
import { Button } from "@/components/ui/button";
import Text from "@/components/ui/text";
import AuthWrapper from "@/components/wrapper/authWrapper";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { useAppMutation } from "@/lib/api";
import { otpVerificationSchema } from "@/schemas/auth";
import React from "react";

function OTPVerification() {
  const { mutate } = useAppMutation("otp");
  return (
    <AuthWrapper
      title="OTP code verification"
      wrapperProps={{
        className:
          "relative sm:top-20 md:top-20 lg:top-0 xl:top-0 2xl:top-0 m-4",
      }}
      includeLogo={false}
    >
      <Text
        text="We have sent an OTP to your email  address . Enter the code below to verify"
        className="my-2"
      />
      <AppForm
        defaultValues={{ otp_code: "" }}
        schema={otpVerificationSchema}
        onSubmit={(data) => mutate(data)}
      >
        {(form) => (
          <FormContentWrapper
            props={{
              className: "flex-column justify-center space-y-4 mt-5",
            }}
          >
            <div className="flex justify-center">
              <OTPFormField name="otp_code" length={6} />
            </div>
            <div>
              <Text className="text-center">Didn&apos;t receive code?</Text>
              {true ? (
                <Text className="text-center">
                  You can receive teh code in 10 sec
                </Text>
              ) : (
                <Text variant="primary" className="text-center m-0">
                  Resend Code
                </Text>
              )}
            </div>

            <Button
              size={"full"}
              variant={
                form.watch("otp_code").length === 6 ? "default" : "disabled"
              }
            >
              Verify
            </Button>
          </FormContentWrapper>
        )}
      </AppForm>
    </AuthWrapper>
  );
}

export default OTPVerification;
