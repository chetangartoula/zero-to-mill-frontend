"use client";
import {
  Accordion,
  AccordionItem,
  BetAccordionTrigger,
} from "@/components/ui/accordion";
import { MenuItems } from "@/types/base";
import { AccordionContent } from "@radix-ui/react-accordion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BetItems from "./BetItems";

function AccordionList({ data }: { data: MenuItems["data"] }) {
  const defaultValue = data?.[0]?.key || "";
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = (newValue: string) => {
    setValue(newValue || defaultValue);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <>
      {defaultValue && (
        <Accordion
          type="single"
          value={value}
          className="border rounded mt-4 bg-menu"
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
        >
          {data?.map((item) => (
            <AccordionItem key={item.key} value={item.key} className="pr-4">
              <BetAccordionTrigger>
                <div className="flex px-4">
                  <Image
                    src={item.logo_url}
                    alt="title"
                    height={20}
                    width={24}
                  />
                  <p className="ml-2 text-s text-cardtitle">{item.title}</p>
                </div>
              </BetAccordionTrigger>
              <AccordionContent>
                {item.key && <BetItems itemKey={item.key} />}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
}

export default AccordionList;
