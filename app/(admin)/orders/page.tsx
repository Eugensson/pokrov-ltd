import { ShoppingCart } from "lucide-react";

import { Orders } from "@/app/(admin)/orders/orders";
import { ScrollAriaWrapper } from "@/components/admin/scroll-aria-wrapper";

export const metadata = {
  title: "Адміністрування замовлень || ТОВ Покров",
};

export default function AdminOrders() {
  return (
    <div className="md:container h-full">
      <h1 className="md:ml-16 mb-5 flex items-center gap-2">
        <ShoppingCart size={28} />
        Замовлення
      </h1>
      <ScrollAriaWrapper>
        <Orders />
      </ScrollAriaWrapper>
    </div>
  );
}
