import AppForm from "@/components/base/form/AppForm";
import OTPFormField from "@/components/formfields/OTPFormField";
import { Button } from "@/components/ui/button";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { useAppMutation } from "@/lib/api";
import { ChangeMPINSchema } from "@/schemas/account-settings";
import React from "react";

function ChangeMPINForm() {
  const { mutate } = useAppMutation("changeMPIN", {});
  const initialValues = {
    old_pin_code: "",
    pin_code: "",
    confirm_pin_code: "",
  };
  return (
    <AppForm
      defaultValues={initialValues}
      schema={ChangeMPINSchema}
      onSubmit={(data) => console.log(data)}
    >
      <FormContentWrapper className="p-4 ">
        <div className="flex justify-center">
          <OTPFormField name="old_mpin" length={4} label="Old MPIN" fullWidth />
        </div>

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

export default ChangeMPINForm;
