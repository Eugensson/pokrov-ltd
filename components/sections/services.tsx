"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { servicesImages } from "@/constants";
import { SquareArrowUpLeft } from "lucide-react";

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
    <section
      className={cn(
        "p-2 md:p-4 xl:p-8 bg-primary-foreground rounded-md grid lg:grid-cols-5",
        className
      )}
    >
      <div className="hidden lg:block relative rounded-md overflow-hidden sm:h-80 lg:order-last lg:h-full lg:col-span-2">
        <Image
          alt={currentImage.title}
          width={600}
          height={600}
          src={`${currentImage.imageURL}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 bg-primary-foreground rounded-l-md lg:col-span-3 lg:p-5 xl:p-10">
        <h2 className="pt-0 text-center lg:hidden">Наші послуги</h2>
        <p>
          ТОВ &quot;НВФ &quot;Покров&quot; спеціалізується на нанесенні нітриду
          титану на листову нержавіючу сталь та декоративні елементи, такі як
          рушникосушки, поручні для басейнів, змішувачі тощо.
        </p>
        <p>
          Наші послуги допоможуть зберегти метал у найкращому стані,
          забезпечуючи його стійкість до корозії та зносу, а також надаючи
          вашому обладнанню естетичний вигляд. Звертайтеся до нас, щоб отримати
          найкращі рішення для вашого бізнесу!
        </p>
        <ul className="flex flex-col gap-2">
          {servicesImages.map(({ href, label }, index) => (
            <li key={index}>
              <Link
                href={href}
                className="flex items-center gap-2 hover:underline"
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <SquareArrowUpLeft className="w-4 h-4 md:w-8 md:h-8 text-zinc-500" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
