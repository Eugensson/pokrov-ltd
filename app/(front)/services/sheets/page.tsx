import Link from "next/link";
import Image from "next/image";
import { ArrowBigLeft, ArrowBigRight, Images } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Sheets() {
  return (
    <>
      <div className="lg:col-span-2">
        <div className="relative overflow-hidden sm:h-48 lg:order-last lg:h-full">
          <Image
            alt="Світлина аркушів з нержавіючої сталі з нанесеним покриттям"
            width={1920}
            height={1080}
            src="/services/sheets.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="lg:col-span-3 lg:pl-4 xl:pl-8">
        <h2 className="text-center">Реалізація аркушів з нержавіючої сталі</h2>
        <ul className="flex flex-col gap-2">
          <li>
            <p>
              TOB &quot;HBФ &quot;Покров&quot; пропонує високоякісні аркуші з
              нержавіючої сталі для покриття будівель та церковних куполів. Наша
              продукція доступна в широкому асортименті спектра кольорів,
              включаючи золотий, мідний, зелений та небесно-синій.
            </p>
          </li>
          <li>
            <p>
              Ми досягаємо такого різноманіття кольорів завдяки використанню не
              тільки нітрид-титанових напилень, але й інших сплавів з титану. Це
              дозволяє дизайнерам та архітекторам мати безліч можливостей для
              реалізації своїх нестандартних ідей.
            </p>
          </li>
          <li>
            <p>
              Наші аркуші виготовлені з високоякісної технічної магнітної сталі,
              відповідно до американського стандарту AISI 430 (розмір
              1000*2000*0.4мм). За потреби ми можемо також виготовити аркуші з
              харчової, немагнітної сталі AISI304, вкритої сполуками титану.
            </p>
          </li>
          <li>
            <p>
              Ми гарантуємо якість нашої продукції, яка підтверджена
              сертифікатами та спеціальними аналізами, проведеними на базі
              лабораторії TOB &quot;НВФ &quot;Покров&quot;.
            </p>
          </li>
        </ul>
        <ul className="flex justify-between mt-4 md:mt-8">
          <li>
            <Button variant="ghost">
              <Link href="/services/cross" className="flex items-center gap-2">
                <ArrowBigLeft />
                <p className="hidden md:block">Попередня</p>
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost">
              <Link
                href="/portfolio/sheets"
                className="flex items-center gap-2"
              >
                <Images />
                <p className="hidden md:block">Галерея</p>
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost">
              <Link href="/services/decor" className="flex items-center gap-2">
                <p className="hidden md:block">Наступна</p>
                <ArrowBigRight />
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
}
