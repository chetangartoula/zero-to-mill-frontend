"use client";
import AppForm from "@/components/base/form/AppForm";
import CheckBoxFormField from "@/components/formfields/CheckBoxFormField";
import InputFormField from "@/components/formfields/InputFormField";
import { Button } from "@/components/ui/button";
import Text from "@/components/ui/text";
import AuthWrapper from "@/components/wrapper/authWrapper";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { useAppMutation } from "@/lib/api";
import { cn } from "@/lib/utils";
import { LoginSchema } from "@/schemas/auth";
import { LoginDTO } from "@/types/base";
import { getPageRoutes } from "@/utils/getRoutes";
import Link from "next/link";
import React from "react";

function Login() {
  const { mutate } = useAppMutation("login", {});

  return (
    <AuthWrapper
      title="Welcome back"
      wrapperProps={{
        className: "relative top-20 m-4",
      }}
    >
      <AppForm<LoginDTO>
        defaultValues={{ username: "", password: "" }}
        schema={LoginSchema}
        onSubmit={(data) => mutate(data)}
      >
        <FormContentWrapper>
          <InputFormField name="username" label="Username" />
          <InputFormField name="password" label="Password" type="password" />
          <div className="flex justify-between">
            <CheckBoxFormField
              name="remember"
              label="Remember me"
              formItemProps={{
                className: cn("flex items-center"),
              }}
              formLabelProps={{
                className: cn("!mt-0 !font-normal"),
              }}
            />
            <Text variant="primary">
              <Link href={getPageRoutes("forgot-password")}>
                Forgot Password
              </Link>
            </Text>
          </div>
        </FormContentWrapper>
        <Button size={"full"}>Login</Button>
        <Text className="text-center mt-3">
          Don&apos;t have an account?{" "}
          <Link href={getPageRoutes("sign-up")} className="text-primary">
            Sign up
          </Link>
        </Text>
      </AppForm>
    </AuthWrapper>
  );
}

export default Login;
