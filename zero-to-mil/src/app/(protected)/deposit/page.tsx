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
  const { mutate } = useAppMutation("load-money");
  const methods = useForm();

  const initialValues: DepositDTO = {
    currency: "USD",
    deposit_method: "Paypal",
    email: "",
    amount: 0,
  };

  const handleNumberClick = (value: number) => {
    const currentAmount = methods.getValues("amount") || 0;
    methods.setValue("amount", currentAmount + value);
  };

  return (
    <FormProvider {...methods}>
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
            </FormContentWrapper>
            <Button size={"full"}>Deposit</Button>
          </>
        )}
      </AppForm>
    </FormProvider>
  );
}

export default Deposit;
