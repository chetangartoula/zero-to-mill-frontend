"use client";
import AppForm from "@/components/base/form/AppForm";
import InputFormField from "@/components/formfields/InputFormField";
import SelectFormField from "@/components/formfields/SelectFormField";
import { Button } from "@/components/ui/button";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { useAppMutation } from "@/lib/api";
import { DepositSchema } from "@/schemas/deposit";
import { DepositDTO } from "@/types/base/deposit";
import React from "react";

function Deposit() {
  const { mutate } = useAppMutation("load-money");

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
      onSubmit={(data) => mutate(data)}
    >
      <FormContentWrapper>
        <SelectFormField
          name="username"
          label="UserName"
          options={[
            {
              label: "John Doe",
              value: "John Doe",
            },
          ]}
        />
        <SelectFormField name="password" label="Password" options={[]} />
        <InputFormField name="email" label="Email" />
        <InputFormField name="amount" label="Amount" />
      </FormContentWrapper>
      <Button size={"full"}>Deposit</Button>
    </AppForm>
  );
}

export default Deposit;
