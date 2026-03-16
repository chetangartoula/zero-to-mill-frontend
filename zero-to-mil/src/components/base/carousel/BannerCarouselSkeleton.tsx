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
    <div className="w-full max-w px-3 sm:px-6">
      <div className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm p-2 shadow-sm">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {[...Array(4)].map((_, index) => (
              <CarouselItem
                key={`banner-skeleton-${index}`}
                className="basis-full sm:basis-[48%] lg:basis-[24%]"
              >
                <Card className="border border-border/60 rounded-2xl overflow-hidden shadow-sm">
                <CardContent className="flex aspect-[21/9] items-center justify-center p-0">
                  <Skeleton className="h-full w-full" />
                </CardContent>
              </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
