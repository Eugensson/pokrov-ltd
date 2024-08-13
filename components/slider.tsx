"use client";

import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import { cn } from "@/lib/utils";

interface Image {
  id: string;
  title: string;
  imageURL: string;
}

interface Props {
  images: Image[];
  className?: string;
}

export const Slider: React.FC<Props> = ({ images, className }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3000 }}
      speed={1500}
      spaceBetween={10}
      slidesPerView={1}
      className={cn("h-auto w-full", className)}
    >
      {images.map(({ id, title, imageURL }) => (
        <SwiperSlide key={id}>
          <Image
            priority
            src={imageURL}
            alt={title}
            width={1920}
            height={1080}
            className="object-cover w-full h-full"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
