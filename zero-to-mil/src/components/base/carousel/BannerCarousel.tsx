"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPageRoutes } from "../../../utils/getRoutes";
import { useRouter } from "next/navigation";

export default function BannerCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const router = useRouter();

  useEffect(() => {
    if (!api) return;
    return () => clearInterval(setInterval(() => api.scrollNext(), 3000));
  }, [api]);

  return (
    <div className="w-full max-w p-2 pt-4">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
          containScroll: "trimSnaps",
          skipSnaps: false,
          dragFree: true,
          duration: 1000,
          dragThreshold: 1,
          slidesToScroll: 1,
        }}
      >
        <CarouselContent className="-ml-1">
          {Array.from({ length: 8 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-[48%] lg:basis-[24%]"
              onClick={() => router.push(getPageRoutes("deposit"))}
            >
              <Card className="border-0">
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <Image
                    src="/banner.png"
                    alt="title"
                    width={450}
                    height={130}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
