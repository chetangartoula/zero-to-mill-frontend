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

function NavCarousel({
  data,
  isactive = "dashboard",
  onClick,
}: NavCarouselProps) {
  const isActive = (path: string) => {
    return path === isactive;
  };
  return (
    <Carousel className="w-full max-w">
      <CarouselContent className="-ml-1">
        {data?.map(({ icon: Icon, ...rest }, index) => (
          <CarouselItem key={index} className="pl-1 basis-1/8 h-16.5">
            {(rest.logo_url || Icon) && (
              <Card
                className="w-20 bg-accent"
                onClick={(e) => onClick && onClick(rest)}
              >
                <CardContent className="flex flex-col aspect-square items-center justify-center p-3">
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
                            ? "brightness-0 invert"
                            : "opacity-50"
                        }`}
                      />
                    ) : Icon ? (
                      <Icon
                        className={`w-4 h-4 ${
                          isActive(rest.value) ? "text-white" : "text-icon"
                        }`}
                      />
                    ) : null}
                  </div>
                  <p
                    className={`text-xs ${
                      isActive(rest.value) ? "text-white" : "text-icon"
                    } font-medium`}
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

export default NavCarousel;
