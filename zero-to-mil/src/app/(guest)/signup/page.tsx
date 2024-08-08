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

function SignUp() {
  const { mutate } = useAppMutation("register");
  return (
    <AuthWrapper
      title="Get Started"
      includeLogo
      wrapperProps={{
        className: "relative top-20 m-4",
      }}
    >
      <AppForm
        defaultValues={{
          email: "",
          username: "",
          password: "",
          passwordConfirmation: "",
        }}
        schema={RegisterSchema}
        onSubmit={(data) => mutate(data)}
      >
        <FormContentWrapper>
          <InputFormField name="email" label="Email" />
          <InputFormField name="username" label="Username" />
          <InputFormField name="password" label="Password" type="password" />
          <InputFormField
            name="passwordConfirmation"
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
