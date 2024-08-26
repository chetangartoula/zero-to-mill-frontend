"use client";
import NumberCarousel from "@/components/base/carousel/NumberCarousel";
import AppForm from "@/components/base/form/AppForm";
import InputFormField from "@/components/formfields/InputFormField";
import SelectFormField from "@/components/formfields/SelectFormField";
import { Button } from "@/components/ui/button";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { useAppMutation } from "@/lib/api";
import { DepositSchema } from "@/schemas/deposit";
import { DepositDTO } from "@/types/base/deposit";
import React from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

function Deposit() {
  const initialValues: DepositDTO = {
    currency: "USD",
    deposit_method: "Paypal",
    email: "",
    amount: 0,
  };

  return (
    <AppForm
      defaultValues={initialValues}
      schema={DepositSchema}
      onSubmit={(data) => console.log("data", data)}
    >
      {(form) => (
        <>
          <FormContentWrapper>
            <SelectFormField
              name="currency"
              label="Currency"
              options={[
                {
                  label: "John Doe",
                  value: "John Doe",
                },
              ]}
            />
            <SelectFormField
              name="deposit_method"
              label="Deposit Method"
              options={[
                {
                  label: "John Doe",
                  value: "John Doe",
                },
              ]}
            />
            <InputFormField name="email" label="Email" />
            <InputFormField name="amount" label="Amount" type="number" />
            <NumberCarousel
              onClick={(value) =>
                form.setValue(
                  "amount",
                  form.getValues("amount") + parseInt(value.toString())
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
  );
}

export default Deposit;
