"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CarouselData } from "@/types/base";
import Image from "next/image";
import React from "react";

export interface NavCarouselProps {
  data: CarouselData[];
  isactive?: string;
  onClick?: (value: Omit<CarouselData, "icon">) => void;
}

export function NavCarousel({
  data,
  isactive = "dashboard",
  onClick,
}: NavCarouselProps) {
  const isActive = (path: string) => path === isactive;

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
        {data?.map(({ icon: Icon, ...rest }, index) => (
          <CarouselItem
            key={index}
            className="pl-1 basis-[5.5rem] sm:basis-[6.5rem] h-16.5"
          >
            {(rest.logo_url || Icon) && (
              <Card
                className={`w-fit-content min-w-[5.5rem] max-w-[7.5rem] h-17.5 rounded-2xl border border-border/60 shadow-sm transition-all ${
                  isActive(rest.value)
                    ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md"
                    : "bg-card/80 text-foreground hover:bg-card"
                }`}
                onClick={() => onClick && onClick(rest)}
                title={rest.name}
              >
                <CardContent className="flex flex-col aspect-square items-center justify-center gap-1 p-2">
                  <div className="p-1">
                    {rest.logo_url ? (
                      <Image
                        priority
                        src={rest.logo_url || ""}
                        key={rest.logo_url}
                        alt={rest.name}
                        width={30}
                        height={30}
                        className={`object-contain ${
                          isActive(rest.value)
                            ? "brightness-110"
                            : "opacity-80"
                        }`}
                      />
                    ) : Icon ? (
                      <Icon
                        className={`w-4 h-4 ${
                          isActive(rest.value)
                            ? "text-primary-foreground"
                            : "text-icon"
                        }`}
                      />
                    ) : null}
                  </div>
                  <p
                    className={`text-xs ${
                      isActive(rest.value)
                        ? "text-primary-foreground"
                        : "text-foreground"
                    } font-medium text-center`}
                  >
                    {rest.name}
                  </p>
                </CardContent>
              </Card>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
