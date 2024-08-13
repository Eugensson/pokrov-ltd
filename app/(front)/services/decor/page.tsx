import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowBigRight, Images } from "lucide-react";

export default function Decor() {
  return (
    <>
      <div className="lg:col-span-2">
        <div className="relative overflow-hidden sm:h-80 lg:order-last lg:h-full  rounded-l-md">
          <Image
            alt="Світлина декоративних елементів з нержавіючої сталі з нанесеним покриттям"
            width={1920}
            height={1080}
            src="/services/decor.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="p-5 lg:col-span-3">
        <h2 className="font-semibold mb-5 text-center uppercase">
          Декоративні елементи
        </h2>
        <ul className="flex flex-col gap-2 text-justify">
          <li>
            Ми застосовуємо технологію напилення нітриду титану не лише на
            аркуші для покрівлі куполів та хрестів, але й на різних предметах
            завдяки нашим сучасним технологіям. Ця технологія дозволяє нам
            отримати ефект не тільки золота, але i міді, небесно-голубого aбo
            зеленого кольорів в поєднанні з різними поверхнями, такими як
            суперзеркало та шліфування (HL). Результатом є дивовижний вигляд
            предмета.
          </li>
          <li>
            Наша фірма гарантує атмосферостійкість напиленого покриття протягом
            50 років згідно з результатами випробувань дії промислової атмосфери
            за ГOCT 9.308-85, ГOCT 9.908-85б, ГOCT 92-1346-83 на вироби з
            магнітної нержавіючої сталі 12X17 за ГOCT 1982-73 i немагнітної
            нержавіючої сталі 04X18H9 за ГOCT 19282-73.
          </li>
          <li>
            Наші аркуші виготовлені з високоякісної технічної магнітної сталі,
            відповідно до американського стандарту AISI 430 (розмір
            1000*2000*0.4 мм). За потреби ми можемо також виготовити аркуші з
            харчової, немагнітної сталі AISI304, вкритої сполуками титану.
          </li>
          <li>
            Якщо ви бажаєте дізнатися більше про напилення нітриду титану на
            декоративні елементи, звертайтеся до наших фахівців.
          </li>
        </ul>
        <ul className="flex justify-between mt-10">
          <li>
            <Button variant="ghost" size="lg">
              <Link href="/services/sheets" className="flex items-center gap-2">
                <ArrowBigLeft /> Попередня послуга
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" size="lg">
              <Link href="/portfolio/decor" className="flex items-center gap-2">
                <Images /> Галерея робіт
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" size="lg">
              <Link href="/services" className="flex items-center gap-2">
                Повернутися на розділ <ArrowBigRight />
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
}
