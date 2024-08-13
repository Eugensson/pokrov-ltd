import Link from "next/link";

import { cn } from "@/lib/utils";

export const Logo = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Link href="/" className={cn("xl:text-lg font-semibold", className)}>
      {children}
    </Link>
  );
};
