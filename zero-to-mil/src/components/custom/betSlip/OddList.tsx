import NumberCarousel from "@/components/base/carousel/NumberCarousel";
import AppForm from "@/components/base/form/AppForm";
import InputFormField from "@/components/formfields/InputFormField";
import { Button } from "@/components/ui/button";
import { useAppMutation } from "@/lib/api";
import { oddListSchema } from "@/schemas/oddList";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

export interface OddListProps {
  isDisabled?: boolean;
  total_odds?: number;
  onClick?: () => void;
}
function OddList({ isDisabled, onClick, total_odds = 0 }: OddListProps) {
  const queryClient = useQueryClient();
  const { mutate } = useAppMutation("placeBet", {
    onSuccess: async (data, form) => {
      await queryClient.invalidateQueries({ queryKey: ["betSlip"] });
      toast.success("Bet placed successfully");
      form.reset();
    },
    onError: async (data: string) => {
      await queryClient.invalidateQueries({ queryKey: ["betSlip"] });
      toast.error(data);
    },
  });
  return (
    <AppForm
      defaultValues={{ amount: 0 }}
      schema={oddListSchema}
      onSubmit={(data) => mutate(data)}
    >
      {(form) => (
        <div className="sticky bottom-0 pb-8 mb-11 mx-4">
          <div className="flex justify-between mb-3 text-lg">
            <p className="font-semibold">Total Odds</p>
            <p>{total_odds}</p>
          </div>
          <div className="bg-input w-full rounded mb-4 p-3 text-sm text-cardtitle">
            <p>Stake amount, $</p>
            <InputFormField
              name="amount"
              label=""
              placeholder="Please enter the amount you want to stake"
              className=""
              type="number"
            />
          </div>
          <NumberCarousel
            onClick={(value) =>
              form.setValue(
                "amount",
                // isNaN(form.getValues("amount"))
                //   ? parseInt(value.toString())
                //   : form.getValues("amount") + parseInt(value.toString())
                parseInt(value.toString())
              )
            }
          />
          <div className="flex justify-between pb-4 mt-3 text-lg">
            <div className="font-semibold">Possible Return</div>
            <p>
              $
              {(
                Math.ceil(form.watch("amount") * total_odds * 100) / 100
              ).toFixed(2)}
            </p>
          </div>
          <Button
            variant="secondary"
            className="w-full mb-4"
            disabled={isDisabled}
            onClick={onClick}
          >
            Place Bet
          </Button>
        </div>
      )}
    </AppForm>
  );
}

export default OddList;
