"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  BetAccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React from "react";

const BetItem = ({ title }: { title: string }) => (
  <div className="bg-input p-2" onClick={(e) => e.stopPropagation()}>
    {title && <p>{title}</p>}
    <div className={cn("flex justify-between align-center")}>
      <div className={cn("flex-column text-center")}>
        <p className="p-2">1</p>
        <p className="bg-subinput py-3 px-10 rounded">8.55</p>
      </div>
      <div className={cn("flex-column text-center")}>
        <p className="p-2">x</p>
        <p className="bg-subinput py-3 px-10 rounded">8.55</p>
      </div>
      <div className={cn("flex-column text-center")}>
        <p className="p-2">2</p>
        <p className="bg-subinput py-3 px-10 rounded">8.55</p>
      </div>
    </div>
  </div>
);

function BetCard() {
  return (
    <Card>
      <Accordion type="multiple">
        <AccordionItem
          value="match-winners"
          className="bg-input mx-2 px-2 rounded mt-4"
        >
          <BetAccordionTrigger title="Test">
            <BetItem title="" />
          </BetAccordionTrigger>
          <AccordionContent>
            <Separator className="bg-muted mt-4" />
            <BetItem title="Match Winner" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="match-winner"
          className="bg-input mx-2 px-2 rounded mt-4"
        >
          <BetAccordionTrigger title="Test">
            <BetItem title="" />
          </BetAccordionTrigger>
          <AccordionContent>
            <BetItem title="Match Winner" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

export default BetCard;
