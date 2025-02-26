"use client";
import React from "react";
import AuthWrapper from "@/components/wrapper/authWrapper";
import InputFormField from "@/components/formfields/InputFormField";
import { Button } from "@/components/ui/button";
import { newPasswordSchema } from "@/schemas/auth";
import AppForm from "@/components/base/form/AppForm";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { useAppMutation } from "@/lib/api";
import { useRouter } from "next/navigation";
import { getPageRoutes } from "@/utils/getRoutes";
import { isString } from "lodash";
import { useToast } from "@/components/ui/use-toast";

function NewPasswordSetUp({
  searchParams,
}: {
  searchParams: {
    ssid: string;
  };
}) {
  const router = useRouter();
  const { mutate } = useAppMutation("forgotPassword");
  const { toast } = useToast();
  return (
    <AuthWrapper
      title="Set New Password"
      wrapperProps={{
        className:
          "relative sm:top-20 md:top-20 lg:top-0 xl:top-0 2xl:top-0 m-4",
      }}
    >
      <AppForm
        defaultValues={{
          password: "",
          passwordConfirmation: "",
        }}
        schema={newPasswordSchema}
        onSubmit={(data, form) =>
          mutate(
            {
              ssid: searchParams.ssid,
              new_password: data.password,
              confirm_password: data.passwordConfirmation,
            },
            {
              onSuccess: () => {
                toast({
                  title: "Password Set",
                  description: "You can now login with your new password",
                  variant: "success",
                });
                router.push(getPageRoutes("login"));
              },
              onError: (error: any) => {
                if (error.response?.data) {
                  Object.entries(error.response.data).forEach(
                    ([key, value]) => {
                      form.setError(key as any, {
                        type: "manual",
                        message: value as string,
                      });
                    }
                  );
                } else {
                  isString(error) &&
                    toast({
                      title: "Error",
                      description: error,
                      variant: "destructive",
                    });
                }
              },
            }
          )
        }
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
