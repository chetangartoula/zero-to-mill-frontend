import React from "react";
import AuthWrapper from "@/components/wrapper/authWrapper";
import InputFormField from "@/components/formfields/InputFormField";
import { Button } from "@/components/ui/button";
import { newPasswordSchema } from "@/schemas/auth";
import AppForm from "@/components/base/form/AppForm";

function NewPasswordSetUp() {
  return (
    <AuthWrapper title="New Password Setup" includeLogo={false}>
      <AppForm
        defaultValues={{
          password: "",
          passwordConfirmation: "",
        }}
        schema={newPasswordSchema}
        onSubmit={(data) => console.log(data)}
      >
        <InputFormField name="password" label="Password" type="password" />
        <InputFormField
          name="passwordConfirmation"
          label="Confirm Password"
          type="password"
        />
        <Button variant="destructive" size={"full"}>
          Set New Password
        </Button>
      </AppForm>
    </AuthWrapper>
  );
}

export default NewPasswordSetUp;
