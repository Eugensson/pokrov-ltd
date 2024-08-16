import { cn } from "@/lib/utils";
import { Social } from "@/components/social";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer
      className={cn(
        "container flex flex-col-reverse md:flex-row justify-center md:justify-between items-center gap-2 py-2 border-t-2",
        className
      )}
    >
      <div className="flex flex-col text-xs items-center md:items-start gap-1">
        <span className="text-xs md:text-sm">ТОВ НВФ Покров</span>
        <span className="text-xs md:text-sm text-muted-foreground">
          Науково-виробнича фірма
        </span>
        <span className="text-xs lg:text-sm text-muted-foreground">
          &copy; 2024. Усі права захищено. Покров,ТОВ
        </span>
      </div>
      <Social className="text-muted-foreground" />
    </footer>
  );
};
