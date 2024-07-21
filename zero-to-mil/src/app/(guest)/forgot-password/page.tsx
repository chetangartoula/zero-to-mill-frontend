import AppForm from "@/components/base/form/AppForm";
import InputFormField from "@/components/formfields/InputFormField";
import AuthWrapper from "@/components/wrapper/authWrapper";
import { forgotPasswordSchema } from "@/schemas/auth";
import React from "react";

function ForgotPassword() {
  return (
    <AuthWrapper title="Forgot Password" includeLogo>
      <AppForm
        defaultValues={{ email: "" }}
        schema={forgotPasswordSchema}
        onSubmit={(data) => console.log(data)}
      >
        <InputFormField name="email" label="Email" />
      </AppForm>
    </AuthWrapper>
  );
}

export default ForgotPassword;
