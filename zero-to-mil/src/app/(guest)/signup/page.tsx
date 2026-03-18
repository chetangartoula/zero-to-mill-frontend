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
import { RegisterDTO } from "@/types/base";
import { BaseApiResponse } from "@/types/global";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";
import { useToast } from "@/components/ui/use-toast";

function SignUp() {
  const router = useRouter();
  const { toast } = useToast();
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

      const otpVerificationUrl = getPageRoutes(
        "otp-verification",
        {},
        {
          email: decodeURIComponent(variables.email),
          username: decodeURIComponent(variables.username),
        }
      );
      try {
        router.push(decodeURIComponent(otpVerificationUrl));
      } catch (error) {
        toast({
          title: "Error",
          description: error?.toString() || "An error occurred",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error?.toString() || "An error occurred",
        variant: "destructive",
      });
    },
  });

  return (
    <AuthWrapper
      title="Get Started"
      includeLogo
      wrapperProps={{
        className: "relative sm:top-20 md:top-20 lg:top-0 xl:top-0 2xl:top-0",
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
        <Text className="text-center mt-3 text-foreground">
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
