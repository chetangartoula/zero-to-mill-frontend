import AppForm from "@/components/base/form/AppForm";
import InputFormField from "@/components/formfields/InputFormField";
import { Button } from "@/components/ui/button";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { useAppMutation } from "@/lib/api";
import { ChangePasswordSchema } from "@/schemas/account-settings";
import { ChangePasswordDTO } from "@/types/base";
import React from "react";

function ChangePasswordFrom() {
  const initialData = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };
  const { mutate } = useAppMutation("changePassword", {});
  return (
    <AppForm<ChangePasswordDTO>
      defaultValues={initialData}
      schema={ChangePasswordSchema}
      onSubmit={(data) => mutate(data)}
    >
      <FormContentWrapper className="p-4">
        <InputFormField name="old_password" label="Old Password" />
        <InputFormField name="new_password" label="New Password" />
        <InputFormField name="confirm_password" label="Cofirm Password" />
        <Button type="submit" size={"full"}>
          Submit
        </Button>
      </FormContentWrapper>
    </AppForm>
  );
}

export default ChangePasswordFrom;
