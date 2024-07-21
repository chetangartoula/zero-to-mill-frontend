"use client";
import AppForm from "@/components/base/form/AppForm";
import InputFormField from "@/components/formfields/InputFormField";
import { Button } from "@/components/ui/button";
import AuthWrapper from "@/components/wrapper/authWrapper";
import { RegisterSchema } from "@/schemas/auth";
import React from "react";
import Link from "next/link";
import { getPageRoutes } from "@/utils/getRoutes";

function SignUp() {
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
        onSubmit={(data) => console.log(data)}
      >
        <div>
          <InputFormField name="email" label="Email" />
          <InputFormField name="username" label="Username" />
          <InputFormField name="password" label="Password" type="password" />
          <InputFormField
            name="passwordConfirmation"
            label="Confirm Password"
            type="password"
          />
        </div>
        <Button variant="destructive" size={"full"}>
          Login
        </Button>
        <p>
          Do you have an account?{" "}
          <Link href={getPageRoutes("sign-up")}>Login</Link>
        </p>
      </AppForm>
    </AuthWrapper>
  );
}

export default SignUp;
