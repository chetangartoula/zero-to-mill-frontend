"use client";
import NumberCarousel from "@/components/base/carousel/NumberCarousel";
import AppForm from "@/components/base/form/AppForm";
import InputFormField from "@/components/formfields/InputFormField";
import SelectFormField from "@/components/formfields/SelectFormField";
import { Button } from "@/components/ui/button";
import DetailWrapper from "@/components/wrapper/detailWrapper";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { WithDrawSchema } from "@/schemas/withdraw";
import React from "react";
import { useFormContext } from "react-hook-form";

function Withdraw() {
  const initialValue = {
    currency: "USD",
    deposit_method: "Paypal",
    email: "",
    amount: 0,
  };
  return (
    <DetailWrapper title="Withdraw" navigationLink={"test"}>
      <AppForm
        defaultValues={initialValue}
        schema={WithDrawSchema}
        onSubmit={(data) => console.log("data", data)}
      >
        {(form) => (
          <>
            <FormContentWrapper>
              <InputFormField name="email" label="Email" />
              <SelectFormField
                name="deposit_method"
                label="WithDraw Method"
                options={[
                  {
                    label: "John Doe",
                    value: "John Doe",
                  },
                ]}
              />
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
                  <p>${form.watch("amount")}</p>
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

export default Withdraw;
