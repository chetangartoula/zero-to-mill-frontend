import { Button } from "@/components/ui/button";
import React from "react";

export interface OddListProps {
  isDisabled?: boolean;
  onClick?: () => void;
}
function OddList({ isDisabled, onClick }: OddListProps) {
  return (
    <div className="sticky bottom-0 pb-8 mb-11 mx-4">
      <div className="flex justify-between mb-3 text-lg">
        <p className="font-semibold">Total Odds</p>
        <p>25</p>
      </div>
      <div className="bg-input w-full rounded mb-4 p-3 text-sm text-cardtitle">
        <p>Stake amount, $</p>
        <p>0.00</p>
      </div>
      <div className="flex flex-wrap justify-between gap-19 text-base">
        <p className="bg-input py-1 rounded flex-1 text-center">5</p>
        <p className="bg-input py-1 rounded flex-1 text-center">10</p>
        <p className="bg-input py-1 rounded flex-1 text-center">50</p>
      </div>
      <div className="flex justify-between pb-4 mt-3 text-lg">
        <div className="font-semibold">Possible Return</div>
        <p>$1400</p>
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
  );
}

export default OddList;
