"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Banner } from "@/types/base";
import Autoplay from "embla-carousel-autoplay";

export default function BannerCarousel({ data }: { data: Banner[] }) {
  const router = useRouter();
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <div className="w-full max-w p-2 pt-4">
      <Carousel
        className="w-full"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-1">
          {data.map((_, index) => (
            <CarouselItem
              key={`banner-${index}-${_.id}`}
              className="basis-full sm:basis-[48%] lg:basis-[24%]"
              onClick={() => router.push(_.link)}
            >
              <Card className="border-0">
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <Image
                    src={_.file_path}
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
