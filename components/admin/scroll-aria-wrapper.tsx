import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const ScrollAriaWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <ScrollArea
      className={cn(
        "md:ml-16 md:m-auto w-full h-full max-w-[300px] md:max-w-[700px] lg:max-w-[955px] xl:max-w-[1375px] max-h-[500px] whitespace-nowrap",
        className
      )}
    >
      {children}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
