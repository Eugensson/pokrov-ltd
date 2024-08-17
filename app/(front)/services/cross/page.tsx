import Link from "next/link";
import Image from "next/image";
import { ArrowBigLeft, ArrowBigRight, Images } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Cross() {
  return (
    <>
      <div className="lg:col-span-2">
        <div className="relative overflow-hidden sm:h-48 lg:order-last lg:h-full">
          <Image
            alt="Світлина виготовленого хреста з нанесеним покриттям"
            width={1920}
            height={1080}
            src="/services/cross.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="lg:col-span-3 lg:pl-4 xl:pl-8">
        <h2 className="text-center">Проектування та виготовлення хрестів</h2>
        <ul className="flex flex-col gap-2">
          <li>
            <p>
              TOB &quot;НВФ &quot;Покров&quot; спеціалізується на проектуванні
              та виготовленні накупольних хрестів різної складності,
              конфігурацій та габаритів. Ми використовуємо унікальну інноваційну
              технологію вакуумно-плазмового напилення, що дозволяє нам
              створювати навіть найбільш нестандартні проекти на основі
              високоякісної нержавіючої сталі, покритої захисним шаром нітрид
              титану.
            </p>
          </li>
          <li>
            <p>
              Наша компанія пропонує виготовлення накупольних хрестів у трьох
              основних категоріях:
            </p>
          </li>
          <li>
            <p>
              1. Вироби, що повністю, включаючи основну частину та всі
              декоративні елементи, складаються зі сталі. Це найбільш
              розповсюджений вид хрестів, який виготовляється за давньою
              методикою, що вже багато років використовується світовими
              майстрами.
            </p>
          </li>
          <li>
            <p>
              2. Накупольні хрести з елементами вітражу. Декоративні акценти з
              фацетованого скла надають виробам неповторного вигляду: хрест грає
              різними кольорами в сонячних променях.
            </p>
          </li>
          <li>
            <p>
              3. Хрести з електричним підсвічуванням елементів. B нічний час
              вони створюють унікальний ефект сяяння куполу.
            </p>
          </li>
          <li>
            <p>
              Дві останні категорії виробів - особиста розробка наших
              спеціалістів. Ми готові реалізувати їх під ваше замовлення. Для
              вас доступні як вже готові проекти, так i можливість роботи за
              наданим вами ескізом. Обирайте накупольні хрести від
              &quot;Покрову&quot; та зробіть свою церкву неповторною.
            </p>
          </li>
        </ul>
        <ul className="flex justify-between mt-4 md:mt-8">
          <li>
            <Button variant="ghost">
              <Link href="/services/domes" className="flex items-center gap-2">
                <ArrowBigLeft />
                <p className="hidden md:block">Попередня</p>
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost">
              <Link href="/portfolio/cross" className="flex items-center gap-2">
                <Images />
                <p className="hidden md:block">Галерея</p>
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost">
              <Link href="/services/sheets" className="flex items-center gap-2">
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
