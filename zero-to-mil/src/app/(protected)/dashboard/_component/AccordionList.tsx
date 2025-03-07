"use client";
import {
  Accordion,
  AccordionItem,
  BetAccordionTrigger,
} from "@/components/ui/accordion";
import { BetSlipProps, MenuItems } from "@/types/base";
import { AccordionContent } from "@radix-ui/react-accordion";
import Image from "next/image";
import React, { useEffect } from "react";
import BetItems from "./BetItems";
import { useAppStore } from "@/store";
import Nosportsfound from "@/components/custom/fallback/nosportsfound";

function AccordionList({
  data,
  activeSlip,
}: {
  data: MenuItems["data"];
  activeSlip: BetSlipProps[];
}) {
  const defaultValue = data?.[0]?.key || "";
  const { setActiveSportKey } = useAppStore((state) => state);
  const handleValueChange = (newValue: string) => {
    setActiveSportKey(newValue || defaultValue);
  };

  useEffect(() => {
    setActiveSportKey(defaultValue);
  }, [defaultValue, setActiveSportKey]);
  return (
    <>
      {
        <Accordion
          type="single"
          // value={activeSportKey || "live"}
          className="border rounded mt-4 bg-menu"
          collapsible
          onValueChange={handleValueChange}
        >
          {data?.map((item) => (
            <AccordionItem
              key={item.key}
              value={item.key}
              onClick={() => {
                setActiveSportKey(item.key);
              }}
            >
              <BetAccordionTrigger>
                <div className="flex px-4 items-center pr-6">
                  <Image
                    src={item.logo_url}
                    alt="title"
                    height={20}
                    width={24}
                  />
                  <p className="ml-2 text-sm text-cardtitle">{item.title}</p>
                </div>
              </BetAccordionTrigger>
              <AccordionContent>
                {item.key && (
                  <BetItems itemKey={item.key} activeSlip={activeSlip} />
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      }
      {data?.length === 0 && <Nosportsfound />}
    </>
  );
}

export default AccordionList;
