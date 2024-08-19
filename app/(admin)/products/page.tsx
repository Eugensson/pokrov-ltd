import { Package } from "lucide-react";

import { Products } from "@/app/(admin)/products/products";
import { ScrollAriaWrapper } from "@/components/admin/scroll-aria-wrapper";

export const metadata = {
  title: "Адміністрування товарів || ТОВ Покров",
};

export default function AdminProducts() {
  return (
    <div className="md:container h-full">
      <h1 className="md:ml-16 mb-5 flex items-center gap-2">
        <Package size={28} />
        Товари
      </h1>
      <ScrollAriaWrapper>
        <Products />
      </ScrollAriaWrapper>
    </div>
  );
}
