"use client";
import NumberCarousel from "@/components/base/carousel/NumberCarousel";
import AppForm from "@/components/base/form/AppForm";
import InputFormField from "@/components/formfields/InputFormField";
import SelectFormField from "@/components/formfields/SelectFormField";
import { Button } from "@/components/ui/button";
import DetailWrapper from "@/components/wrapper/detailWrapper";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { currency, deposit_methods } from "@/constants/data";
import { useAppMutation } from "@/lib/api";
import { DepositSchema } from "@/schemas/deposit";
import { DepositDTO } from "@/types/base/deposit";
import { getPageRoutes } from "@/utils/getRoutes";
import React from "react";
import { toast } from "sonner";

function Deposit() {
  const initialValues: DepositDTO = {
    currency: "USD",
    deposit_method: "cash",
    user_identity: "",
    amount: 0,
    remarks: "",
  };

  const { mutate } = useAppMutation("deposit", {
    onSuccess: async () => {
      toast.success("Deposit successful");
      console.log("Deposit successful");
    },
  });

  return (
    <DetailWrapper title="Deposit" navigationLink={getPageRoutes("menu")}>
      <AppForm
        defaultValues={initialValues}
        schema={DepositSchema}
        onSubmit={(data, form) => {
          mutate(data);
          form.reset();
        }}
      >
        {(form) => (
          <>
            <FormContentWrapper>
              <SelectFormField
                name="currency"
                label="Currency"
                options={currency}
              />
              <SelectFormField
                name="deposit_method"
                label="Deposit Method"
                options={deposit_methods}
              />
              <InputFormField
                name="user_identity"
                label="Request To (Username)"
              />
              <InputFormField name="amount" label="Amount" type="number" />
              <InputFormField name="remarks" label="Remarks" />
              <NumberCarousel
                onClick={(value) =>
                  form.setValue(
                    "amount",
                    // form.getValues("amount") + parseInt(value.toString())
                    parseInt(value.toString())
                  )
                }
              />
              <div className="border-y p-4 space-y-3 text-2xs font-normal">
                <div className="flex justify-between">
                  <p className="text-2xs">Amount Fee</p>
                  <p>$0</p>
                </div>
                <div className="flex justify-between">
                  <p>Total</p>
                  <p>{form.watch("amount")}</p>
                </div>
              </div>
            </FormContentWrapper>
            <Button size={"full"}>Deposit</Button>
          </>
        )}
      </AppForm>
    </DetailWrapper>
  );
}

export default Deposit;
