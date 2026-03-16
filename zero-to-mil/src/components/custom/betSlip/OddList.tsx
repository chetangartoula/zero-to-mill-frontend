import NumberCarousel from "@/components/base/carousel/NumberCarousel";
import AppForm from "@/components/base/form/AppForm";
import InputFormField from "@/components/formfields/InputFormField";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAppMutation } from "@/lib/api";
import { oddListSchema } from "@/schemas/oddList";
import { useQueryClient } from "@tanstack/react-query";
import { round } from "lodash";
import React from "react";

export interface OddListProps {
  isDisabled?: boolean;
  total_odds?: number;
  onClick?: () => void;
}
function OddList({ isDisabled, onClick, total_odds = 0 }: OddListProps) {
  const queryClient = useQueryClient();
  const { mutate } = useAppMutation("placeBet", {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["betSlip"] });
      toast({
        title: "Bet placed",
        description: "Bet has been placed successfully",
        variant: "success",
      });
    },
    onError: async (data: string) => {
      await queryClient.invalidateQueries({ queryKey: ["betSlip"] });
      toast({
        title: "Error",
        description: data.toString(),
        variant: "destructive",
      });
    },
  });
  return (
    <AppForm
      defaultValues={{ amount: 0 }}
      schema={oddListSchema}
      onSubmit={(data, form) => {
        console.log("dtaa", data);
        mutate(data);
        form.reset();
      }}
    >
      {(form) => (
        <div className="sticky bottom-0 pb-6 mb-8 mx-4 sm:mx-6">
          <div className="flex justify-between mb-3 text-base sm:text-lg">
            <p className="font-semibold text-foreground">Total Odds</p>
            <p className="font-semibold text-foreground">
              {round(total_odds, 2)}
            </p>
          </div>
          <div className="bg-input/80 border border-border/60 w-full rounded-2xl mb-4 p-3 text-sm text-cardtitle">
            <p className="text-muted-foreground">Stake amount, $</p>
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
            <div className="font-semibold text-foreground">
              Possible Return
            </div>
            <p>
              $
              {(
                Math.ceil(form.watch("amount") * total_odds * 100) / 100
              ).toFixed(2)}
            </p>
          </div>
          <Button
            variant="default"
            className="w-full mb-4 rounded-xl"
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
