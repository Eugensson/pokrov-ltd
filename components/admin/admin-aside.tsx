"use client";

import {
  Images,
  LayoutDashboard,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const AdminAside = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                  `${
                    pathname === "/dashboard" &&
                    "bg-accent text-accent-foreground"
                  }`
                )}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span className="sr-only">Адмінпанель</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Адмінпанель</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/orders"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                  `${
                    pathname === "/orders" && "bg-accent text-accent-foreground"
                  }`
                )}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Замовлення</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Замовлення</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/products"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                  `${
                    pathname === "/products" &&
                    "bg-accent text-accent-foreground"
                  }`
                )}
              >
                <Package className="h-5 w-5" />
                <span className="sr-only">Товари</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Товари</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/customers"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                  `${
                    pathname === "/customers" &&
                    "bg-accent text-accent-foreground"
                  }`
                )}
              >
                <Users2 className="h-5 w-5" />
                <span className="sr-only">Користувачі</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Користувачі</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/gallery"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                  `${
                    pathname === "/gallery" &&
                    "bg-accent text-accent-foreground"
                  }`
                )}
              >
                <Images className="h-5 w-5" />
                <span className="sr-only">Gallery</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Галерея</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                  `${
                    pathname === "/settings" &&
                    "bg-accent text-accent-foreground"
                  }`
                )}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Налаштування</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Налаштування</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};
