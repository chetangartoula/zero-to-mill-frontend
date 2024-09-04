"use client";
import AppForm from "@/components/base/form/AppForm";
import OTPFormField from "@/components/formfields/OTPFormField";
import { Button } from "@/components/ui/button";
import Text from "@/components/ui/text";
import AuthWrapper from "@/components/wrapper/authWrapper";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { useAppMutation } from "@/lib/api";
import { otpVerificationSchema } from "@/schemas/auth";
import { getPageRoutes } from "@/utils/getRoutes";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import Login from "../../login/page";
import LoginUser from "@/store/actions/login";
import { useAppStore } from "@/store";

function OTPVerification({
  searchParams,
}: {
  searchParams: {
    otp: string;
    email: string;
    username: string;
  };
}) {
  const router = useRouter();
  const {
    setAccessToken,
    username: storeUsername,
    password,
  } = useAppStore((state) => state);
  const { mutate } = useAppMutation("otp", {
    onSuccess: async () => {
      const response = await LoginUser({
        username: storeUsername,
        password: password,
      });
      if (response instanceof Error) {
        router.push(getPageRoutes("login"));
        toast.error(response.message);
        return;
      } else {
        setAccessToken(response.access);
        router.push(getPageRoutes("dashboard"));
      }
      toast.success("OTP verification successful");
    },
  });

  const otp = searchParams.otp || "";
  const email = searchParams.email || "";
  const username = searchParams.username || "";
  return (
    <AuthWrapper title="OTP code verification" includeLogo={false}>
      <Text
        text={`Since this is a test case. Please enter ${otp} as OTP`}
        className="my-2"
      />
      <AppForm
        defaultValues={{ otp_code: "" }}
        schema={otpVerificationSchema}
        onSubmit={(data) =>
          mutate({
            email,
            username,
            otp_code: data.otp_code,
          })
        }
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
