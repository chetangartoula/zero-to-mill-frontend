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
    <div className="w-full max-w px-3 sm:px-6">
      <div className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm p-2 shadow-sm">
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
                <Card className="border border-border/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="flex aspect-[21/9] items-center justify-center p-0">
                  <Image
                    src={_.file_path}
                    alt="title"
                    width={450}
                    height={130}
                    className="h-full w-full object-cover object-center"
                  />
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
