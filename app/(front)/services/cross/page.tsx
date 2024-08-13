import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowBigRight, Images } from "lucide-react";

export default function Cross() {
  return (
    <>
      <div className="lg:col-span-2">
        <div className="relative overflow-hidden sm:h-80 lg:order-last lg:h-full  rounded-l-md">
          <Image
            alt="Світлина виготовленого хреста з нанесеним покриттям"
            width={1920}
            height={1080}
            src="/services/cross.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="p-5 lg:col-span-3">
        <h2 className="font-semibold mb-5 text-center uppercase">
          Проектування та виготовлення хрестів
        </h2>
        <ul className="flex flex-col gap-2 text-justify">
          <li>
            TOB &quot;НВФ &quot;Покров&quot; спеціалізується на проектуванні та
            виготовленні накупольних хрестів різної складності, конфігурацій та
            габаритів. Ми використовуємо унікальну інноваційну технологію
            вакуумно-плазмового напилення, що дозволяє нам створювати навіть
            найбільш нестандартні проекти на основі високоякісної нержавіючої
            сталі, покритої захисним шаром нітрид титану.
          </li>
          <li>
            Наша компанія пропонує виготовлення накупольних хрестів у трьох
            основних категоріях:
          </li>
          <li>
            1. Вироби, що повністю, включаючи основну частину та всі декоративні
            елементи, складаються зі сталі. Це найбільш розповсюджений вид
            хрестів, який виготовляється за давньою методикою, що вже багато
            років використовується світовими майстрами.
          </li>
          <li>
            2. Накупольні хрести з елементами вітражу. Декоративні акценти з
            фацетованого скла надають виробам неповторного вигляду: хрест грає
            різними кольорами в сонячних променях.
          </li>
          <li>
            3. Хрести з електричним підсвічуванням елементів. B нічний час вони
            створюють унікальний ефект сяяння куполу.
          </li>
          <li>
            Дві останні категорії виробів - особиста розробка наших
            спеціалістів. Ми готові реалізувати їх під ваше замовлення. Для вас
            доступні як вже готові проекти, так i можливість роботи за наданим
            вами ескізом. Обирайте накупольні хрести від &quot;Покрову&quot; та
            зробіть свою церкву неповторною.
          </li>
        </ul>
        <ul className="flex justify-between mt-10">
          <li>
            <Button variant="ghost" size="lg">
              <Link href="/services/domes" className="flex items-center gap-2">
                <ArrowBigLeft /> Попередня послуга
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" size="lg">
              <Link href="/portfolio/cross" className="flex items-center gap-2">
                <Images /> Галерея робіт
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" size="lg">
              <Link href="/services/sheets" className="flex items-center gap-2">
                Наступна послуга <ArrowBigRight />
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
}
