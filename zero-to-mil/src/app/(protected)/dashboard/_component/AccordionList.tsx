import {
  Accordion,
  AccordionItem,
  BetAccordionTrigger,
} from "@/components/ui/accordion";
import { MenuItems } from "@/types/base";
import { AccordionContent } from "@radix-ui/react-accordion";
import Image from "next/image";
import React from "react";
import BetItems from "./BetItems";

function AccordionList({ data }: { data: MenuItems["data"] }) {
  return (
    <div>
      <Accordion type="single" className="border rounded mt-4 bg-menu">
        {data?.map((item) => (
          <AccordionItem key={item.key} value={item.key} className="pr-4">
            <BetAccordionTrigger>
              <div className="flex px-4">
                <Image src={item.logo_url} alt="title" height={20} width={24} />
                <p className="ml-2 text-s text-cardtitle">{item.title}</p>
              </div>
            </BetAccordionTrigger>
            <AccordionContent>
              <BetItems key={item.key} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default AccordionList;
