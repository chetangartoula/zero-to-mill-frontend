"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  BetAccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { OddList, Outcome, TabData } from "@/types/base";
import { capitalize } from "lodash";
import Image from "next/image";
import React from "react";

const BetItem = ({
  title,
  betData,
}: {
  title: string;
  betData?: Outcome[];
}) => (
  <div className="bg-input p-2" onClick={(e) => e.stopPropagation()}>
    {title && <p>{title}</p>}

    <div className={cn("flex justify-between align-center gap-6 pl-2 text-s")}>
      {betData?.map((item) => (
        <div className={cn("flex-column text-center w-full")} key={item.name}>
          <p className="p-2">{item.name}</p>
          <p className="bg-subinput py-3 rounded">{item.point ?? item.price}</p>
        </div>
      ))}
    </div>
  </div>
);

function BetCard({ data, title }: { data: OddList; title?: TabData }) {
  return (
    <div className="bg-menu p-4 mt-4">
      {title && (
        <div className="flex">
          <Image src={title.imageUrl} alt="title" fill sizes="16px" />
          <p className="ml-2 text-s text-cardtitle">{title.title}</p>
        </div>
      )}
      <Separator className="bg-muted mt-4" />
      <Accordion type="multiple">
        <AccordionItem
          value={data.sport_key}
          className="bg-input rounded mt-4 pr-4"
        >
          <BetAccordionTrigger>
            {data.bookmaker && (
              <BetItem title="" betData={data.bookmaker.markets[0].outcomes} />
            )}
          </BetAccordionTrigger>
          <AccordionContent>
            {data?.bookmaker?.markets?.slice(1)?.map((item) => (
              <>
                <Separator className="bg-muted mt-4" />
                <BetItem title={capitalize(item.key)} betData={item.outcomes} />
              </>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default BetCard;
