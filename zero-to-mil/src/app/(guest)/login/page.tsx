"use client";
import AppForm from "@/components/base/form/AppForm";
import CheckBoxFormField from "@/components/formfields/CheckBoxFormField";
import InputFormField from "@/components/formfields/InputFormField";
import { Button } from "@/components/ui/button";
import AuthWrapper from "@/components/wrapper/authWrapper";
import { cn } from "@/lib/utils";
import { LoginSchema } from "@/schemas/auth";
import { getPageRoutes } from "@/utils/getRoutes";
import Link from "next/link";
import React from "react";
import { z } from "zod";

type Login = z.infer<typeof LoginSchema>;
function Login() {
  return (
    <AuthWrapper
      title="Welcome back"
      includeLogo
      wrapperProps={{
        className: "relative top-20 m-4",
      }}
    >
      <AppForm
        defaultValues={{ username: "", password: "" }}
        schema={LoginSchema}
        onSubmit={(data) => console.log(data)}
      >
        <div className="space-y-3">
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
                className: cn("!mt-0 "),
              }}
            />
            <Link href={getPageRoutes("forgot-password")}>Forgot Password</Link>
          </div>

          <Button variant="destructive" size={"full"}>
            Login
          </Button>
          <p>
            Don&apos;t have an account?{" "}
            <Link href={getPageRoutes("sign-up")}>Sign up</Link>
          </p>
        </div>
      </AppForm>
    </AuthWrapper>
  );
}

export default Login;
