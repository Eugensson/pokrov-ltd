import Link from "next/link";
import Image from "next/image";
import { ArrowBigLeft, ArrowBigRight, Images } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Decor() {
  return (
    <>
      <div className="lg:col-span-2">
        <div className="relative overflow-hidden sm:h-48 lg:order-last lg:h-full  rounded-l-md">
          <Image
            alt="Світлина декоративних елементів з нержавіючої сталі з нанесеним покриттям"
            width={1920}
            height={1080}
            src="/services/decor.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="lg:col-span-3 lg:pl-4 xl:pl-8">
        <h2 className="text-center">Декоративні елементи</h2>
        <ul className="flex flex-col gap-2 text-justify">
          <li>
            <p>
              Ми застосовуємо технологію напилення нітриду титану не лише на
              аркуші для покрівлі куполів та хрестів, але й на різних предметах
              завдяки нашим сучасним технологіям. Ця технологія дозволяє нам
              отримати ефект не тільки золота, але i міді, небесно-голубого aбo
              зеленого кольорів в поєднанні з різними поверхнями, такими як
              суперзеркало та шліфування (HL). Результатом є дивовижний вигляд
              предмета.
            </p>
          </li>
          <li>
            <p>
              Наша фірма гарантує атмосферостійкість напиленого покриття
              протягом 50 років згідно з результатами випробувань дії
              промислової атмосфери за ГOCT 9.308-85, ГOCT 9.908-85б, ГOCT
              92-1346-83 на вироби з магнітної нержавіючої сталі 12X17 за ГOCT
              1982-73 i немагнітної нержавіючої сталі 04X18H9 за ГOCT 19282-73.
            </p>
          </li>
          <li>
            <p>
              Наші аркуші виготовлені з високоякісної технічної магнітної сталі,
              відповідно до американського стандарту AISI 430 (розмір
              1000*2000*0.4 мм). За потреби ми можемо також виготовити аркуші з
              харчової, немагнітної сталі AISI304, вкритої сполуками титану.
            </p>
          </li>
          <li>
            <p>
              Якщо ви бажаєте дізнатися більше про напилення нітриду титану на
              декоративні елементи, звертайтеся до наших фахівців.
            </p>
          </li>
        </ul>
        <ul className="flex justify-between mt-4 md:mt-8">
          <li>
            <Button variant="ghost">
              <Link href="/services/sheets" className="flex items-center gap-2">
                <ArrowBigLeft />
                <p className="hidden md:block">Попередня</p>
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost">
              <Link href="/portfolio/decor" className="flex items-center gap-2">
                <Images />
                <p className="hidden md:block">Галерея</p>
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost">
              <Link href="/services" className="flex items-center gap-2">
                <p className="hidden md:block">До розділу</p>
                <ArrowBigRight />
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
}
