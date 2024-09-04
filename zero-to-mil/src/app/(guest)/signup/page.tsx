"use client";
import AppForm from "@/components/base/form/AppForm";
import InputFormField from "@/components/formfields/InputFormField";
import { Button } from "@/components/ui/button";
import AuthWrapper from "@/components/wrapper/authWrapper";
import { RegisterSchema } from "@/schemas/auth";
import React from "react";
import Link from "next/link";
import { getPageRoutes } from "@/utils/getRoutes";
import Text from "@/components/ui/text";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { useAppMutation } from "@/lib/api";
import { LoginDTO, RegisterDTO } from "@/types/base";
import { toast } from "sonner";
import { BaseApiResponse } from "@/types/global";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";

function SignUp() {
  const router = useRouter();
  const { setLoginState } = useAppStore((state) => state);
  const { mutate } = useAppMutation("register", {
    onSuccess: (
      data: BaseApiResponse<{ otp: string; responseData: string }>,
      variables: RegisterDTO
    ) => {
      setLoginState({
        username: variables.username,
        password: variables.password,
      });
      toast.success("Account created successfully");
      const otpVerificationUrl = getPageRoutes(
        "otp-verification",
        {},
        {
          otp: decodeURIComponent(data.responseData.otp),
          email: decodeURIComponent(variables.email),
          username: decodeURIComponent(variables.username),
        }
      );
      try {
        router.push(decodeURIComponent(otpVerificationUrl));
      } catch (error) {
        console.error("Failed to navigate:", error);
      }
    },
  });

  return (
    <AuthWrapper
      title="Get Started"
      includeLogo
      wrapperProps={{
        className: "relative top-20 m-4",
      }}
    >
      <AppForm<RegisterDTO>
        defaultValues={{
          email: "",
          username: "",
          password: "",
          confirm_password: "",
        }}
        schema={RegisterSchema}
        onSubmit={(data) => mutate(data)}
      >
        <FormContentWrapper>
          <InputFormField name="email" label="Email" />
          <InputFormField name="username" label="Username" />
          <InputFormField name="password" label="Password" type="password" />
          <InputFormField
            name="confirm_password"
            label="Confirm Password"
            type="password"
          />
        </FormContentWrapper>
        <Button size={"full"}>Create Account</Button>
        <Text variant="white" className="text-center mt-3">
          Do you have an account?{" "}
          <Link href={getPageRoutes("login")} className="text-primary">
            Login
          </Link>
        </Text>
      </AppForm>
    </AuthWrapper>
  );
}

export default SignUp;
