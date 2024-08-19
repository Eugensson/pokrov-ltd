import { UsersRound } from "lucide-react";

import { Customers } from "@/app/(admin)/customers/customers";
import { ScrollAriaWrapper } from "@/components/admin/scroll-aria-wrapper";

export const metadata = {
  title: "Адміністрування користувачів || ТОВ Покров",
};

export default function AdminCustomers() {
  return (
    <div className="md:container h-full">
      <h1 className="md:ml-16 mb-5 flex items-center gap-2">
        <UsersRound size={28} />
        Користувачі
      </h1>
      <ScrollAriaWrapper>
        <Customers />
      </ScrollAriaWrapper>
    </div>
  );
}
