import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowBigRight, Images } from "lucide-react";

export default function Domes() {
  return (
    <>
      <div className="lg:col-span-2">
        <div className="relative overflow-hidden sm:h-80 lg:order-last lg:h-full  rounded-l-md">
          <Image
            alt="Світлина Храму"
            width={1920}
            height={1080}
            src="/services/domes.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="p-5 lg:col-span-3">
        <h2 className="font-semibold mb-5 text-center uppercase">
          Проектування та виготовлення куполів
        </h2>
        <ul className="flex flex-col gap-2 text-justify">
          <li>
            У нашому проектному відділі працюють висококваліфіковані фахівці,
            які проходять спеціальну підготовку та атестацію. Ми застосовуємо
            сучасний підхід до проектування, використовуючи ліцензійну програму
            для створення точної 3D-моделі куполу. Наші інженери уважно вивчають
            всі деталі, що включають характер та кількість необхідних
            матеріалів, технології виробництва та взаємодію фахівців на різних
            етапах проектування.
          </li>
          <li>
            Ми звертаємо увагу на кліматичні особливості регіону, сумісність з
            закладними деталями, особливості транспортування та можливі способи
            монтажу. Комплексний підхід та висока професійність кожного
            співробітника дозволяє нам створювати максимально точну проектну
            документацію для високотехнологічних виробів. Ми дотримуємось
            поставлених строків та враховуємо всі побажання наших клієнтів.
          </li>
          <li>
            Після розробки проекту майстри беруться за виготовлення куполу. Вони
            виконують всі необхідні роботи, такі як виготовлення каркасу,
            обшивку конструкції деревом та покриття листом нержавіючої сталі з
            нанесенням нітриду титану. Ми дотримуємось всіх норм безпеки та
            чітко дотримуємось проектної документації, щоб забезпечити безпечну
            та якісну роботу. Роботи виконуються строго відповідно до строку,
            оговореного із замовником.
          </li>
        </ul>
        <ul className="flex justify-between mt-10">
          <li>
            <Button variant="ghost" size="lg">
              <Link href="/services" className="flex items-center gap-2">
                <ArrowBigLeft /> Повернутися на розділ
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" size="lg">
              <Link href="/portfolio/domes" className="flex items-center gap-2">
                <Images /> Галерея робіт
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" size="lg">
              <Link href="/services/cross" className="flex items-center gap-2">
                Наступна послуга <ArrowBigRight />
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
}
