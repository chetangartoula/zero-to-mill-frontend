"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  BetAccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DynamicIcon from "@/components/utils/DynamicIcon";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import React from "react";

const BetItem = ({ title }: { title: string }) => (
  <div className="bg-input p-2" onClick={(e) => e.stopPropagation()}>
    {title && <p>{title}</p>}
    <div className={cn("flex justify-between align-center gap-6 pl-2")}>
      <div className={cn("flex-column text-center w-full")}>
        <p className="p-2">1</p>
        <p className="bg-subinput py-3 rounded">8.55</p>
      </div>
      <div className={cn("flex-column text-center w-full")}>
        <p className="p-2">x</p>
        <p className="bg-subinput py-3 rounded">8.55</p>
      </div>
      <div className={cn("flex-column text-center w-full")}>
        <p className="p-2">2</p>
        <p className="bg-subinput py-3 rounded">8.55</p>
      </div>
    </div>
  </div>
);

function BetCard() {
  return (
    <div className="bg-menu p-4 mt-4">
      <div className="flex">
        <DynamicIcon IconComponent={StarIcon} className={"text-cardtitle"} />
        <p className="ml-2 text-s text-cardtitle">Football</p>
      </div>
      <Separator className="bg-muted mt-4" />
      <Accordion type="multiple">
        <AccordionItem
          value="match-winners"
          className="bg-input rounded mt-4 pr-4"
        >
          <BetAccordionTrigger
            dualTitle={{
              firstTeam: "Team A",
              secondTeam: "Team B",
            }}
          >
            <BetItem title="" />
          </BetAccordionTrigger>
          <AccordionContent>
            <Separator className="bg-muted mt-4" />
            <BetItem title="Match Winner" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default BetCard;
