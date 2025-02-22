import AppForm from "@/components/base/form/AppForm";
import InputFormField from "@/components/formfields/InputFormField";
import { Button } from "@/components/ui/button";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { useAppMutation } from "@/lib/api";
import { ChangePasswordSchema } from "@/schemas/account-settings";
import { ChangePasswordDTO } from "@/types/base";
import React from "react";
import { toast } from "sonner";

function ChangePasswordFrom() {
  const initialData = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };
  const { mutate } = useAppMutation("changePassword", {
    onSuccess: async (data, form) => {
      toast.success("Password changed successfully");
      form.reset();
      console.log("Password changed successfully");
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
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
