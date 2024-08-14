import Link from "next/link";
import Image from "next/image";
import { SquareArrowUpLeft } from "lucide-react";

export default function Services() {
  return (
    <>
      <div className="lg:col-span-2">
        <div className="relative overflow-hidden sm:h-80 lg:order-last lg:h-full  rounded-l-md ">
          <Image
            alt="Світлина Храму"
            width={1920}
            height={1080}
            src="/services/services.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="p-5 lg:col-span-3">
        <h2 className="font-semibold mb-5 text-center uppercase">Хто ми?</h2>
        <p className="text-justify">
          TOB &quot;HBФ &quot;Покров&quot; спеціалізується на напиленні
          нітрид-титану на листову нержавіючу сталь та декоративні елементи
          (рушникосушки, поручні для басейнів, змішувачі тощо).
        </p>
        <p className="text-justify">
          Наші послуги допоможуть зберегти метал в найкращому вигляді,
          забезпечуючи стійкість до корозії та зносу, а також створюючи
          естетичний вигляд для вашого обладнання. Звертайтеся до нас і
          отримуйте найкращі рішення для вашого бізнесу!
        </p>
        <p className="text-justify">
          Ми прагнемо до постійного розвитку, закупівлі інноваційного обладнання
          та вдосконалення робочих місць. Це є необхідним для забезпечення
          високої якості виготовленої продукції та покращення обслуговування
          клієнтів.
        </p>
        <p className="text-justify">
          Ми хочемо, щоб ви були задовленні вибором саме нашої компанії, та мали
          бажання розповісти про це всім.
        </p>
        <h2 className="font-semibold my-5 text-center uppercase">
          Послуги, які надаються компанією
        </h2>
        <ul className="flex flex-col gap-2">
          <li>
            <Link
              href="/services/domes"
              className="flex items-center gap-3 hover:underline"
            >
              <SquareArrowUpLeft className="text-slate-500" />
              Проектування та виготовлення куполів
            </Link>
          </li>
          <li>
            <Link
              href="/services/cross"
              className="flex items-center gap-3 hover:underline"
            >
              <SquareArrowUpLeft className="text-slate-500" />
              Проектування та виготовлення накупольних хрестів
            </Link>
          </li>
          <li>
            <Link
              href="/services/sheets"
              className="flex items-center gap-3 hover:underline"
            >
              <SquareArrowUpLeft className="text-slate-500" />
              Реалізація аркушів із нержавіючої сталі
            </Link>
          </li>
          <li>
            <Link
              href="/services/decor"
              className="flex items-center gap-3 hover:underline"
            >
              <SquareArrowUpLeft className="text-slate-500" />
              Декоративні елементи з нержавіючої сталі
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
