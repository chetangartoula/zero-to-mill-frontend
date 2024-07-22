"use client";
import AppForm from "@/components/base/form/AppForm";
import OTPFormField from "@/components/formfields/OTPFormField";
import Text from "@/components/ui/text";
import AuthWrapper from "@/components/wrapper/authWrapper";
import { otpVerificationSchema } from "@/schemas/auth";
import React from "react";

type Props = {};

function OTPVerification({}: Props) {
  return (
    <AuthWrapper title="OTP code verification" includeLogo={false}>
      <Text text="We have sent an OTP to your email  address ramxxxXgmail.com. Enter the code below to verify" />
      <AppForm
        defaultValues={{ otp: "" }}
        schema={otpVerificationSchema}
        onSubmit={(data) => console.log(data)}
      >
        <OTPFormField name="otp" length={6} />
        <Text>Didn&apos;t receive code?</Text>
        <Text>You can receive teh code in sec</Text>
      </AppForm>
    </AuthWrapper>
  );
}

export default OTPVerification;
