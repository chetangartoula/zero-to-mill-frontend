"use client";
import AppForm from "@/components/base/form/AppForm";
import OTPFormField from "@/components/formfields/OTPFormField";
import { Button } from "@/components/ui/button";
import Text from "@/components/ui/text";
import AuthWrapper from "@/components/wrapper/authWrapper";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { useAppMutation } from "@/lib/api";
import { WithDrawVerifySchema } from "@/schemas/withdraw";
import { useAppStore } from "@/store";
import { WithDrawVerifyDTO } from "@/types/base";
import React from "react";
import { toast } from "sonner";

function WithDrawVerify() {
  const { withdraw_method, user_identity, amount } = useAppStore(
    (state) => state
  );
  const { mutate } = useAppMutation("withdraw", {
    onSuccess: async (data, form) => {
      toast.success(`WithDraw successful`);
      form.reset();
      console.log("data", data);
    },
  });
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
        onSubmit={(data) =>
          mutate({
            withdraw_method,
            user_identity,
            amount,
            ...data,
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
