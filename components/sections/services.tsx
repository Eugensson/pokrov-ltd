"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { servicesImages } from "@/constants";

interface Props {
  className?: string;
}

export const Services: React.FC<Props> = ({ className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = servicesImages[currentIndex];

  const handleMouseEnter = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className={cn("grid grid-cols-1 lg:grid-cols-5", className)}>
      <div className="relative overflow-hidden sm:h-80 lg:order-last lg:h-full bg-primary-foreground rounded-r-md lg:col-span-2">
        <Image
          alt={currentImage.title}
          width={600}
          height={600}
          src={`${currentImage.imageURL}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-4 md:p-10 bg-primary-foreground rounded-l-md lg:col-span-3">
        <p className="text-primary xl:text-xl">
          ТОВ &quot;НВФ &quot;Покров&quot; спеціалізується на нанесенні нітриду
          титану на листову нержавіючу сталь та декоративні елементи, такі як
          рушникосушки, поручні для басейнів, змішувачі тощо.
        </p>
        <p className="text-primary xl:text-xl">
          Наші послуги допоможуть зберегти метал у найкращому стані,
          забезпечуючи його стійкість до корозії та зносу, а також надаючи
          вашому обладнанню естетичний вигляд. Звертайтеся до нас, щоб отримати
          найкращі рішення для вашого бізнесу!
        </p>

        <ul className="flex flex-col gap-2 mt-10">
          {servicesImages.map(({ href, label }, index) => (
            <li key={index}>
              <Link
                href={href}
                className="text-primary xl:text-xl hover:underline"
                onMouseEnter={() => handleMouseEnter(index)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
