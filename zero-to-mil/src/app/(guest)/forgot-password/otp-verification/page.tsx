import AppForm from "@/components/base/form/AppForm";
import OTPFormField from "@/components/formfields/OTPFormField";
import AuthWrapper from "@/components/wrapper/authWrapper";
import { otpVerificationSchema } from "@/schemas/auth";
import React from "react";

type Props = {};

function OTPVerification({}: Props) {
  return (
    <AuthWrapper title="OTP code verification" includeLogo={false}>
      <AppForm
        defaultValues={{ otp: "" }}
        schema={otpVerificationSchema}
        onSubmit={(data) => console.log(data)}
      >
        <OTPFormField name="otp" label="Email" length="6" />
        <p>Didn&apos;t receive code?</p>
        <p>You can receive teh code in 10 sec</p>
      </AppForm>
    </AuthWrapper>
  );
}

export default OTPVerification;
