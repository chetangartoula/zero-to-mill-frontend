import AppForm from "@/components/base/form/AppForm";
import OTPFormField from "@/components/formfields/OTPFormField";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { useAppMutation, useAppQuery } from "@/lib/api";
import { SetMPINSchema } from "@/schemas/account-settings";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

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
      toast.success("MPIN set successfully");
      await queryClient.invalidateQueries({ queryKey: ["getMPIN"] });
    },
  });
  return (
    <AppForm
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
