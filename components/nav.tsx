"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { navLinks } from "@/constants";

interface Props {
  className?: string;
}

export const Nav: React.FC<Props> = ({ className }) => {
  const pathname = usePathname();

  return (
    <nav className={cn("hidden md:block", className)}>
      <ul className="flex items-center gap-1">
        {navLinks.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(
                "flex items-center gap-4 px-2.5 text-xs lg:text-base xl:text-xl font-medium text-muted-foreground hover:text-foreground",
                `${pathname === href && "text-foreground"}`
              )}
            >
              <h4>{label}</h4>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
