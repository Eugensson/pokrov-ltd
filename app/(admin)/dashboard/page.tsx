import { LayoutDashboard } from "lucide-react";

import { Dashboard } from "@/app/(admin)/dashboard/dashboard";
import { ScrollAriaWrapper } from "@/components/admin/scroll-aria-wrapper";

export const metadata = {
  title: "Панель адміністратора || ТОВ Покров",
};

export default function AdminDashboard() {
  return (
    <div className="md:container h-full">
      <h1 className="md:ml-16 mb-5 flex items-center gap-2">
        <LayoutDashboard size={28} />
        Адмінпанель
      </h1>
      <ScrollAriaWrapper>
        <Dashboard />
      </ScrollAriaWrapper>
    </div>
  );
}
