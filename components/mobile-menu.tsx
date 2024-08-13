"use client";

import Link from "next/link";
import { AlignJustify } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { navLinks } from "@/constants";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const MobileMenu = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="md:hidden">
          <AlignJustify size={16} />
          <span className="sr-only">Toggle Mobile Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium mt-20">
          {navLinks.map(({ label, href, icon }) => {
            const Icon = icon;
            return (
              <SheetTrigger asChild key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                    `${pathname === href && "text-foreground"}`
                  )}
                >
                  <Icon size={20} />
                  {label}
                </Link>
              </SheetTrigger>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
