import Image from "next/image";

import { cn } from "@/lib/utils";
import { Nav } from "@/components/nav";
import { Logo } from "@/components/logo";
import { MenuButton } from "@/components/menu-button";
import { MobileMenu } from "@/components/mobile-menu";
import { CartButton } from "@/components/cart-button";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={cn(
        "container flex justify-between items-center shadow-md dark:shadow-slate-500/30",
        className
      )}
    >
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
    </header>
  );
};
