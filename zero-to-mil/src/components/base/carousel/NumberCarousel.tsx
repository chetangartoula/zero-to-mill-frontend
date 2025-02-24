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
    <Carousel className="w-full max-w">
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
              className={`w-20 ${
                isActive === value
                  ? "text-haravara bg-haravara-foreground"
                  : "text-white bg-accent"
              }`}
            >
              <CardContent className="flex flex-col aspect-square items-center justify-center p-3">
                <p
                  className={`text-xs ${
                    isActive === value ? "text-haravara " : "text-white"
                  } font-medium`}
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
