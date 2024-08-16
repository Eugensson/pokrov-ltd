import { cn } from "@/lib/utils";
import { Social } from "@/components/social";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer
      className={cn(
        "flex flex-col-reverse md:flex-row justify-center md:justify-between items-center gap-2 border-t-2 p-2 md:px-4 xl:px-8",
        className
      )}
    >
      <div className="block text-muted-foreground text-center md:text-left text-[8px] md:text-xs">
        <p className="font-bold">ТОВ НВФ Покров</p>
        <p>Науково-виробнича фірма</p>
        <p>&copy; 2024. Усі права захищено.</p>
      </div>
      <Social className="text-muted-foreground" />
    </footer>
  );
};
