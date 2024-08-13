"use client";

import Link from "next/link";
import { PanelLeft } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { adminNavLinks } from "@/constants";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const AdminMobileMenu = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="mt-20 grid gap-6 text-lg font-medium">
          {adminNavLinks.map(({ label, href, icon }) => {
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
