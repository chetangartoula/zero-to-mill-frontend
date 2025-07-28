"use client";
import AppForm from "@/components/base/form/AppForm";
import OTPFormField from "@/components/formfields/OTPFormField";
import { Button } from "@/components/ui/button";
import Text from "@/components/ui/text";
import { toast } from "@/components/ui/use-toast";
import AuthWrapper from "@/components/wrapper/authWrapper";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { useAppMutation } from "@/lib/api";
import { WithDrawVerifySchema } from "@/schemas/withdraw";
import { useAppStore } from "@/store";
import { WithDrawVerifyDTO } from "@/types/base";
import { getPageRoutes } from "@/utils/getRoutes";
import { useRouter } from "next/navigation";
import React from "react";

function WithDrawVerify() {
  const router = useRouter();
  const { withdraw_method, user_identity, amount } = useAppStore(
    (state) => state
  );
  const { mutate } = useAppMutation("withdraw");
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
      <AppForm<WithDrawVerifyDTO>
        defaultValues={{ mpin: "" }}
        schema={WithDrawVerifySchema}
        onSubmit={(data, form) =>
          mutate(
            {
              withdraw_method,
              user_identity,
              amount,
              ...data,
            },
            {
              onSuccess: async (data) => {
                toast({
                  title: "Withdraw",
                  description: "Withdraw successful",
                  variant: "success",
                });

                router.push(getPageRoutes("dashboard"));
                form.reset();
              },
              onError: (error) => {
                toast({
                  title: "Withdraw",
                  description: error?.toString() || "An error occurred",
                  variant: "destructive",
                });
              },
            }
          )
        }
      >
        {(form) => (
          <FormContentWrapper
            props={{
              className: "flex-column justify-center space-y-4 mt-5",
            }}
          >
            <div className="flex justify-center">
              <OTPFormField name="mpin" length={4} fullWidth />
            </div>

            <Button
              size={"full"}
              variant={form.watch("mpin").length === 4 ? "default" : "disabled"}
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
