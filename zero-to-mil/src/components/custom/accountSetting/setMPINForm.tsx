import AppForm from "@/components/base/form/AppForm";
import OTPFormField from "@/components/formfields/OTPFormField";
import { Button } from "@/components/ui/button";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { SetMPINSchema } from "@/schemas/account-settings";
import React from "react";

type Props = {};

function SetMPINForm({}: Props) {
  const initialValues = {
    new_mpin: "",
    confirm_mpin: "",
  };
  return (
    <AppForm
      defaultValues={initialValues}
      schema={SetMPINSchema}
      onSubmit={(data) => console.log(data)}
    >
      <FormContentWrapper className="p-4 w-full border">
        <OTPFormField name="new_mpin" length={4} label="New MPIN" fullWidth />
        <OTPFormField
          name="confirm_mpin"
          length={4}
          label="Confirm MPIN"
          fullWidth
        />
        <Button type="submit" size={"full"}>
          Submit
        </Button>
      </FormContentWrapper>
    </AppForm>
  );
}

export default SetMPINForm;
