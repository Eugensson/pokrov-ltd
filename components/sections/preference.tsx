import { FaLeaf } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { AiFillControl } from "react-icons/ai";
import { IoShieldCheckmark } from "react-icons/io5";

import { cn } from "@/lib/utils";
import { Droplets, ShieldCheck, SlidersVertical, Sprout } from "lucide-react";

interface Props {
  className?: string;
}

export const Preference: React.FC<Props> = ({ className }) => {
  return (
    <section className={cn("hidden md:block p-2 md:p-4 xl:p-8", className)}>
      <h2 className="hidden">Переваги нашої продукції</h2>
      <ul className="w-full md:grid grid-cols-2 xl:grid-cols-4 gap-4">
        <li className="bg-primary-foreground rounded-md p-4 flex flex-col place-items-center justify-center gap-4">
          <Droplets size={50} className="text-blue-500" />
          <p className="text-center w-4/5">
            Стійкість до атмосферних опадів та хімічних речовин
          </p>
        </li>
        <li className="bg-primary-foreground rounded-md p-4 flex flex-col place-items-center justify-center gap-4">
          <SlidersVertical size={50} className="text-red-500" />
          <p className="text-center w-4/5">
            Широка гамма кольору та фактури (матова-глянець)
          </p>
        </li>
        <li className="bg-primary-foreground rounded-md p-4 flex flex-col place-items-center justify-center gap-4">
          <ShieldCheck size={50} className="text-indigo-500" />
          <p className="text-center w-4/5">
            Корозійна стійкість покриття виробів
          </p>
        </li>
        <li className="bg-primary-foreground rounded-md p-4 flex flex-col place-items-center justify-center gap-4">
          <Sprout size={50} className="text-green-500" />
          <p className="text-center w-4/5">
            Екологічність виробництва та експлуатації
          </p>
        </li>
      </ul>
    </section>
  );
};
