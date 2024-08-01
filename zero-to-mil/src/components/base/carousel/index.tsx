import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";

export interface NavCarouselProps {
  data: {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

function NavCarousel({ data }: NavCarouselProps) {
  return (
    <Carousel className="w-full max-w">
      <CarouselContent className="-ml-1">
        {data?.map(({ name, icon: Icon }, index) => (
          <CarouselItem key={index} className="pl-1 basis-1/8 h-16.5">
            <Card className="w-20 bg-accent">
              <CardContent className="flex flex-col aspect-square items-center justify-center p-3">
                <div className="p-1">
                  <Icon className="text-white h-4" />
                </div>
                <p className="text-xs text-white font-medium">{name}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default NavCarousel;
