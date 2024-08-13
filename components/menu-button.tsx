"use client";

import {
  Check,
  LayoutDashboard,
  LogIn,
  LogOut,
  Monitor,
  Moon,
  Sun,
  History,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { signIn, signOut, useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const MenuButton = () => {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  const signoutHandler = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-md"
        >
          <UserRound size={20} aria-label="Avatar" className="text-slate-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {session && session?.user ? (
          <>
            <DropdownMenuLabel className="cursor-pointer">
              {session?.user?.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {session.user.isAdmin && (
              <DropdownMenuItem>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <LayoutDashboard size={16} />
                  Панель адміна
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Link href="/order-history" className="flex items-center gap-2">
                <History size={16} />
                Історія замовлень
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link href="/profile" className="flex items-center gap-2">
                <UserRound size={16} />
                Профіль
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem
              className="cursor-pointer flex items-center gap-2"
              onClick={() => signIn()}
            >
              <LogIn size={16} />
              Вхід/Реєстрація
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer">
            <Monitor className="mr-2 size-4" />
            Тема
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="cursor-pointer"
              >
                <Monitor className="mr-2 size-4" />
                Системна
                {theme === "system" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="cursor-pointer"
              >
                <Sun className="mr-2 size-4" />
                Світла
                {theme === "light" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="cursor-pointer"
              >
                <Moon className="mr-2 size-4" />
                Темна
                {theme === "dark" && (
                  <Check className="ms-2 size-4 cursor-pointer" />
                )}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        {session && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={signoutHandler}
            >
              <LogOut size={16} className="mr-2" />
              Вихід
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
