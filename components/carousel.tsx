"use client";

import {
  Play,
  Pause,
  CircleChevronLeft,
  CircleChevronRight,
} from "lucide-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Frame } from "@/lib/models/Frame";
import { Button } from "@/components/ui/button";

interface Props {
  frames: Frame[];
  className?: string;
}

const Carousel: React.FC<Props> = ({ frames, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
    playOrStop();
  }, [emblaApi]);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    setIsPlaying(autoplay.isPlaying());
    emblaApi
      .on("autoplay:play", () => setIsPlaying(true))
      .on("autoplay:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(autoplay.isPlaying()));
  }, [emblaApi]);

  return (
    <div
      className={cn("embla mx-auto mt-5 max-w-4xl cursor-pointer", className)}
    >
      <div className="embla__viewport h-[450px]" ref={emblaRef}>
        <div className="embla__container h-full">
          {frames.map((frame) => (
            <div
              className="embla__slide flex items-center justify-center"
              key={frame._id}
            >
              <Image
                src={frame.image}
                alt={frame.title || "Світнина продукту"}
                width={300}
                height={300}
                className="rounded-md object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="flex justify-start items-center gap-1">
          <Button type="button" onClick={scrollPrev} variant="link" size="icon">
            <CircleChevronLeft className="text-slate-500" />
          </Button>
          <Button type="button" onClick={scrollNext} variant="link" size="icon">
            <CircleChevronRight className="text-slate-500" />
          </Button>
        </div>
        <Button
          type="button"
          onClick={toggleAutoplay}
          variant="link"
          size="icon"
        >
          {isPlaying ? (
            <Pause className="text-slate-500" />
          ) : (
            <Play className="text-slate-500" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Carousel;
