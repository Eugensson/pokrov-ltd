import { cn } from "@/lib/utils";
import { MenuButton } from "@/components/menu-button";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { Nav } from "./nav";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CartButton } from "@/components/cart-button";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("shadow-md dark:shadow-slate-500/30", className)}>
      <div className="container flex justify-between items-center">
        <Logo>
          <Image
            src="/logo.svg"
            alt="logo"
            width={80}
            height={80}
            className="w-10 h-10 md:w-20 md:h-20"
          />
        </Logo>
        <Nav />
        <ul className="flex items-center gap-4">
          <li>
            <CartButton />
          </li>
          <li className="hidden md:block">
            <MenuButton />
          </li>
          <li>
            <MobileMenu />
          </li>
        </ul>
      </div>
    </header>
  );
};
