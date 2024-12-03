import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { carouseldata } from "@/constants/data";
import { CarouselData } from "@/types/base";
import Image from "next/image";
import React from "react";

export interface NavCarouselProps {
  data: CarouselData[];
  isactive?: string;
}

function NavCarousel({ data, isactive = "dashboard" }: NavCarouselProps) {
  const isActive = (path: string) => {
    return path === isactive;
  };
  return (
    <Carousel className="w-full max-w">
      <CarouselContent className="-ml-1">
        {[...carouseldata, ...data]?.map(
          ({ name, imageUrl = "", icon: Icon, value }, index) => (
            <CarouselItem key={index} className="pl-1 basis-1/8 h-16.5">
              {(imageUrl || Icon) && (
                <Card className="w-20 bg-accent">
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-3">
                    <div className="p-1">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={name}
                          fill
                          sizes="16px"
                          className={`object-contain ${
                            isActive(value)
                              ? "brightness-0 invert"
                              : "opacity-50"
                          }`}
                        />
                      ) : Icon ? (
                        <Icon
                          className={`w-4 h-4 ${
                            isActive(value) ? "text-white" : "text-icon"
                          }`}
                        />
                      ) : null}
                    </div>
                    <p
                      className={`text-xs ${
                        isActive(value) ? "text-white" : "text-icon"
                      } font-medium`}
                    >
                      {name}
                    </p>
                  </CardContent>
                </Card>
              )}
            </CarouselItem>
          )
        )}
      </CarouselContent>
    </Carousel>
  );
}

export default NavCarousel;
