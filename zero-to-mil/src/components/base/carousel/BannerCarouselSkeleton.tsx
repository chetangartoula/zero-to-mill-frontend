"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export default function BannerCarouselSkeleton() {
  return (
    <div className="w-full max-w p-2 pt-4">
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {[...Array(4)].map((_, index) => (
            <CarouselItem
              key={`banner-skeleton-${index}`}
              className="basis-full sm:basis-[48%] lg:basis-[24%] bg-betcard"
            >
              <Card className="border-0">
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <Skeleton className="w-[450px] h-[130px] rounded" />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
