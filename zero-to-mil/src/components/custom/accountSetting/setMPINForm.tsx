import AppForm from "@/components/base/form/AppForm";
import OTPFormField from "@/components/formfields/OTPFormField";
import { Button } from "@/components/ui/button";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { useAppMutation } from "@/lib/api";
import { SetMPINSchema } from "@/schemas/account-settings";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { SetMPINDTO } from "@/types/base";
import { toast } from "@/components/ui/use-toast";

export interface SetMPINFormProps {
  displaySkip?: boolean;
  onSkip?: () => void;
}

function SetMPINForm({ displaySkip = false, onSkip }: SetMPINFormProps) {
  const queryClient = useQueryClient();
  const initialValues = {
    pin_code: "",
    confirm_pin_code: "",
  };
  const { mutate } = useAppMutation("setMPIN", {
    onSuccess: async () => {
      toast({
        title: "MPIN",
        description: "MPIN set successfully",
        variant: "success",
      });
      await queryClient.invalidateQueries({ queryKey: ["getMPIN"] });
    },
  });
  return (
    <AppForm<SetMPINDTO>
      defaultValues={initialValues}
      schema={SetMPINSchema}
      onSubmit={({ pin_code }) =>
        mutate({
          pin_code,
          initial_sign_up: false,
        })
      }
    >
      <FormContentWrapper className=" w-full">
        <OTPFormField name="pin_code" length={4} label="New MPIN" fullWidth />
        <OTPFormField
          name="confirm_pin_code"
          length={4}
          label="Confirm MPIN"
          fullWidth
        />
        <Button type="submit" size={"full"}>
          Set MPIN
        </Button>
        {displaySkip && (
          <Button
            type="button"
            variant="ghostprimary"
            size="full"
            onClick={onSkip}
          >
            Skip
          </Button>
        )}
      </FormContentWrapper>
    </AppForm>
  );
}

export default SetMPINForm;
