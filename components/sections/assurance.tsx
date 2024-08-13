import { cn } from "@/lib/utils";
import { Award, Trophy } from "lucide-react";
import Link from "next/link";

interface Props {
  className?: string;
}

export const Assurance: React.FC<Props> = ({ className }) => {
  return (
    <section
      className={cn("p-4 lg:p-8 bg-primary-foreground rounded-md", className)}
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Гарантія якості</h2>

        <p className="mt-4 text-primary xl:text-xl">
          Ми забезпечуємо надійність наших виробів протягом 50 років. Вся
          продукція відповідає ТУ У 25.6-37651685-001:2012 &quot;Покриття
          металеві іонно-плазмові&quot; та підтверджена сертифікатом якості.
          Програма гарантії якості виробництва була розроблена для задоволення
          вимог нашого ринку, включаючи:
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Link
          className="relative block rounded-xl border p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
          href="#"
        >
          <Award size={40} className="absolute top-4 left-4 text-yellow-500" />
          <h2 className="my-7 text-lg font-semibold text-center">
            UA 1.012.0006075, UA 1.012.0017193
          </h2>
          <p className="text-center">Сертифікати відповідності (якості).</p>
        </Link>
        <Link
          className="relative block rounded-xl border p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
          href="#"
        >
          <Award size={40} className="absolute top-4 left-4 text-yellow-500" />
          <h2 className="my-7 text-lg font-semibold text-center">
            TУУ 25.6-37651685-001:2012
          </h2>
          <p className="text-center min-h-10">
            Покриття металеві іонно-плазмові. Технічні умови.
          </p>
        </Link>
        <Link
          className="relative block rounded-xl border p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
          href="#"
        >
          <Award size={40} className="absolute top-4 left-4 text-yellow-500" />
          <h2 className="my-7 text-lg font-semibold text-center">
            ГОСТ 9.908-85
          </h2>
          <p className="text-center">
            Методи визначення показників корозії та корозійної стійкості.
          </p>
        </Link>
        <Link
          className="relative block rounded-xl border p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
          href="#"
        >
          <Award size={40} className="absolute top-4 left-4 text-yellow-500" />
          <h2 className="my-7 text-lg font-semibold text-center">
            ГОСТ 9.308-85
          </h2>
          <p className="text-center">
            Єдина система захисту від корозії та старіння. Покриття металеві та
            неметалеві неорганічні. Методи прискорених корозійних випробувань.
          </p>
        </Link>
        <Link
          className="relative block rounded-xl border p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
          href="#"
        >
          <Award size={40} className="absolute top-4 left-4 text-yellow-500" />
          <h2 className="my-7 text-lg font-semibold text-center">
            ОСТ 92-1346-83
          </h2>
          <p className="text-center">
            Метали, сплави, покриття металеві та неметалеві неорганічні. Методи
            оцінки корозійних руйнувань.
          </p>
        </Link>
        <Link
          className="relative block rounded-xl border p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
          href="#"
        >
          <Award size={40} className="absolute top-4 left-4 text-yellow-500" />
          <h2 className="my-7 text-lg font-semibold text-center">
            ГОСТ 19282-73
          </h2>
          <p className="text-center">
            Сталь низьколегована товстолистова та широкосмугова універсальна.
            Технічні умови.
          </p>
        </Link>
      </div>
    </section>
  );
};
