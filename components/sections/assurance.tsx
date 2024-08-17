import { cn } from "@/lib/utils";
import { Award, Trophy } from "lucide-react";
import Link from "next/link";

interface Props {
  className?: string;
}

export const Assurance: React.FC<Props> = ({ className }) => {
  return (
    <section className={cn("p-1", className)}>
      <div className="text-center">
        <h2 className="pt-0">Гарантія якості</h2>
        <p>
          Ми забезпечуємо надійність наших виробів протягом 50 років. Вся
          продукція відповідає ТУ У 25.6-37651685-001:2012 &quot;Покриття
          металеві іонно-плазмові&quot; та підтверджена сертифікатом якості.
          Програма гарантії якості виробництва була розроблена для задоволення
          вимог нашого ринку, включаючи:
        </p>
      </div>
      <ul className="mt-1 md:mt-2 lg:mt-4 xl:mt-8 hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <li className="relative block rounded-md border p-2 pt-14 transition border-zinc-500/10 hover:shadow-xl dark:shadow-zinc-700/50">
          <Award size={40} className="absolute top-2 left-2 text-zinc-500" />
          <h4 className="text-center">UA 1.012.0006075, UA 1.012.0017193</h4>
          <p className="text-center">Сертифікати відповідності (якості).</p>
        </li>
        <li className="relative block rounded-md border p-2 pt-14 transition border-zinc-500/10 hover:shadow-xl dark:shadow-zinc-700/50">
          <Award size={40} className="absolute top-2 left-2 text-zinc-500" />
          <h4 className="text-center">TУУ 25.6-37651685-001:2012</h4>
          <p className="text-center min-h-10">
            Покриття металеві іонно-плазмові. Технічні умови.
          </p>
        </li>
        <li className="relative block rounded-md border p-2 pt-14 transition border-zinc-500/10 hover:shadow-xl dark:shadow-zinc-700/50">
          <Award size={40} className="absolute top-2 left-2 text-zinc-500" />
          <h4 className="text-center">ГОСТ 9.908-85</h4>
          <p className="text-center">
            Методи визначення показників корозії та корозійної стійкості.
          </p>
        </li>
        <li className="relative block rounded-md border p-2 pt-14 transition border-zinc-500/10 hover:shadow-xl dark:shadow-zinc-700/50">
          <Award size={40} className="absolute top-2 left-2 text-zinc-500" />
          <h4 className="text-center">ГОСТ 9.308-85</h4>
          <p className="text-center">
            Єдина система захисту від корозії та старіння. Покриття металеві та
            неметалеві неорганічні.
          </p>
        </li>
        <li className="relative block rounded-md border p-2 pt-14 transition border-zinc-500/10 hover:shadow-xl dark:shadow-zinc-700/50">
          <Award size={40} className="absolute top-2 left-2 text-zinc-500" />
          <h4 className="text-center">ОСТ 92-1346-83</h4>
          <p className="text-center">
            Метали, сплави, покриття металеві та неметалеві неорганічні.
          </p>
        </li>
        <li className="relative block rounded-md border p-2 pt-14 transition border-zinc-500/10 hover:shadow-xl dark:shadow-zinc-700/50">
          <Award size={40} className="absolute top-2 left-2 text-zinc-500" />
          <h4 className="text-center">ГОСТ 19282-73</h4>
          <p className="text-center">
            Сталь низьколегована товстолистова та широкосмугова універсальна.
            Технічні умови.
          </p>
        </li>
      </ul>
    </section>
  );
};
