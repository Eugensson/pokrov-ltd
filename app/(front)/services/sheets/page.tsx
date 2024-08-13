import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowBigRight, Images } from "lucide-react";

export default function Sheets() {
  return (
    <>
      <div className="lg:col-span-2">
        <div className="relative overflow-hidden sm:h-80 lg:order-last lg:h-full  rounded-l-md">
          <Image
            alt="Світлина аркушів з нержавіючої сталі з нанесеним покриттям"
            width={1920}
            height={1080}
            src="/services/sheets.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="p-5 lg:col-span-3">
        <h2 className="font-semibold mb-5 text-center uppercase">
          Реалізація аркушів з нержавіючої сталі
        </h2>
        <ul className="flex flex-col gap-2 text-justify">
          <li>
            TOB &quot;HBФ &quot;Покров&quot; пропонує високоякісні аркуші з
            нержавіючої сталі для покриття будівель та церковних куполів. Наша
            продукція доступна в широкому асортименті спектра кольорів,
            включаючи золотий, мідний, зелений та небесно-синій.
          </li>
          <li>
            Ми досягаємо такого різноманіття кольорів завдяки використанню не
            тільки нітрид-титанових напилень, але й інших сплавів з титану. Це
            дозволяє дизайнерам та архітекторам мати безліч можливостей для
            реалізації своїх нестандартних ідей.
          </li>
          <li>
            Наші аркуші виготовлені з високоякісної технічної магнітної сталі,
            відповідно до американського стандарту AISI 430 (розмір
            1000*2000*0.4мм). За потреби ми можемо також виготовити аркуші з
            харчової, немагнітної сталі AISI304, вкритої сполуками титану.
          </li>
          <li>
            Ми гарантуємо якість нашої продукції, яка підтверджена сертифікатами
            та спеціальними аналізами, проведеними на базі лабораторії TOB
            &quot;НВФ &quot;Покров&quot;.
          </li>
        </ul>
        <ul className="flex justify-between mt-10">
          <li>
            <Button variant="ghost" size="lg">
              <Link href="/services/cross" className="flex items-center gap-2">
                <ArrowBigLeft /> Попередня послуга
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" size="lg">
              <Link
                href="/portfolio/sheets"
                className="flex items-center gap-2"
              >
                <Images /> Галерея робіт
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" size="lg">
              <Link href="/services/decor" className="flex items-center gap-2">
                Наступна послуга <ArrowBigRight />
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
}
