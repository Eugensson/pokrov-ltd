import { Nav } from "@/components/nav";
import { Logo } from "@/components/logo";
import { MenuButton } from "@/components/menu-button";
import { MobileMenu } from "@/components/mobile-menu";
import { CartButton } from "@/components/cart-button";

export const Header = () => {
  return (
    <header className="w-full flex justify-between items-center shadow-md dark:shadow-zinc-500/30 p-2 md:px-4 xl:px-8">
      <Logo />
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
