"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Amount } from "@/constants/data/amount";
import { FieldDetailResponse } from "@/types/global";
import { isString } from "lodash";
import React, { useState } from "react";

function NumberCarousel({
  data = Amount,
  onClick,
}: {
  data?: FieldDetailResponse[];
  onClick?: (
    value: number | string,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}) {
  const [isActive, setIsActive] = useState<number | string>(0);
  return (
    <Carousel
      className="w-full max-w"
      opts={{
        align: "start",
        loop: false,
        containScroll: false,
        skipSnaps: false,
        dragFree: true,
        duration: 1000,
        dragThreshold: 1,
        slidesToScroll: 1,
      }}
    >
      <CarouselContent className="-ml-1">
        {data?.map(({ name, value }, index) => (
          <CarouselItem
            key={index}
            className="pl-1 basis-1/8 h-16.5"
            onClick={(e) => {
              const numvalue = isString(value)
                ? parseInt(value as string)
                : value;
              setIsActive(numvalue);
              onClick?.(value, e);
            }}
          >
            <Card
              className={`w-20 border border-border/60 rounded-xl shadow-sm transition-colors ${
                isActive === value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card/80 text-foreground hover:bg-card"
              }`}
            >
              <CardContent className="flex flex-col aspect-square items-center justify-center p-3">
                <p
                  className={`text-xs font-semibold ${
                    isActive === value
                      ? "text-primary-foreground"
                      : "text-foreground"
                  }`}
                >
                  {name}
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default NumberCarousel;
