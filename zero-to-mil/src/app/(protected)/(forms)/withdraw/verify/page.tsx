"use client";
import AppForm from "@/components/base/form/AppForm";
import OTPFormField from "@/components/formfields/OTPFormField";
import { Button } from "@/components/ui/button";
import Text from "@/components/ui/text";
import AuthWrapper from "@/components/wrapper/authWrapper";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { otpVerificationSchema } from "@/schemas/auth";
import React from "react";

type Props = {};

function WithDrawVerify({}: Props) {
  return (
    <AuthWrapper
      title="Enter your MPIN"
      includeLogo={false}
      wrapperProps={{
        className: "relative top-20 m-4",
      }}
    >
      <Text
        text={`Enter your 4 digit PIN code to continue`}
        className="my-2 text-center"
      />
      <AppForm
        defaultValues={{ otp_code: "" }}
        schema={otpVerificationSchema}
        onSubmit={(data) => console.log("data", data)}
      >
        {(form) => (
          <FormContentWrapper
            props={{
              className: "flex-column justify-center space-y-4 mt-5",
            }}
          >
            <div className="flex justify-center">
              <OTPFormField name="otp_code" length={4} fullWidth />
            </div>

            <Button
              size={"full"}
              variant={
                form.watch("otp_code").length === 4 ? "default" : "disabled"
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

export default WithDrawVerify;
