"use client";
import NumberCarousel from "@/components/base/carousel/NumberCarousel";
import AppForm from "@/components/base/form/AppForm";
import InputFormField from "@/components/formfields/InputFormField";
import SelectFormField from "@/components/formfields/SelectFormField";
import { Button } from "@/components/ui/button";
import DetailWrapper from "@/components/wrapper/detailWrapper";
import FormContentWrapper from "@/components/wrapper/formContentWrapper";
import { deposit_methods } from "@/constants/data";
import { WithDrawSchema } from "@/schemas/withdraw";
import { useAppStore } from "@/store";
import { WithDrawDTO } from "@/types/base";
import { getPageRoutes } from "@/utils/getRoutes";
import { useRouter } from "next/navigation";
import React from "react";

function Withdraw() {
  const router = useRouter();
  const { setWithdrawState } = useAppStore((state) => state);

  const withDrawInitialValue = {
    withdraw_method: "cash",
    user_identity: "",
    amount: 0,
  };

  return (
    <DetailWrapper title="Withdraw" navigationLink={getPageRoutes("menu")}>
      <AppForm<WithDrawDTO>
        defaultValues={withDrawInitialValue}
        schema={WithDrawSchema}
        onSubmit={async (data) => {
          console.log("withdrawData", data);
          await setWithdrawState(data);
          router.push(getPageRoutes("withdraw-verify"));
        }}
      >
        {(form) => (
          <>
            <FormContentWrapper>
              <InputFormField name="user_identity" label="Username/Email" />
              <SelectFormField
                name="withdraw_method"
                label="WithDraw Method"
                options={deposit_methods}
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
            <Button size={"full"}>Withdraw</Button>
          </>
        )}
      </AppForm>
    </DetailWrapper>
  );
}

export default Withdraw;
