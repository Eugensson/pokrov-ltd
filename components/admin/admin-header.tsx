"use client";

import { usePathname } from "next/navigation";

import { breadcrumbItems } from "@/constants";
import { MenuButton } from "@/components/menu-button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AdminMobileMenu } from "@/components/admin/admin-mobile-menu";

export const AdminHeader = () => {
  const pathname = usePathname();

  const items = breadcrumbItems[pathname] || breadcrumbItems["/settings"];

  return (
    <header className="flex justify-between items-center p-2 md:px-4 shadow-md dark:shadow-slate-500/30">
      <AdminMobileMenu />
      <Breadcrumbs items={items} />
      <MenuButton />
    </header>
  );
};
