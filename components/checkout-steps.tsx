import { cn } from "@/lib/utils";
import { stepList } from "@/constants";
import { Progress } from "@/components/ui/progress";

interface Props {
  current?: 1 | 2 | 3 | 4;
  value?: 25 | 50 | 75 | 100;
}

export const CheckoutSteps: React.FC<Props> = ({
  current = 1,
  value = 25,
}: Props) => {
  return (
    <div className="w-2/3 my-5 mx-auto space-y-5">
      <Progress value={value} className="animate-pulse" />
      <ul className="flex justify-between items-center">
        {stepList.map(({ id, label, icon }) => {
          const Icon = icon;
          return (
            <li
              key={id}
              className={cn(
                "flex items-center gap-2",
                `${id <= current ? "text-yellow-500" : ""}`
              )}
            >
              <Icon size={24} />
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
