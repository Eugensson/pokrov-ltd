import { Metadata } from "next";
import { History } from "lucide-react";

import MyOrders from "./my-orders";

export const metadata: Metadata = {
  title: "Історія замовлень || ТОВ Покров",
};

export default function OrderHistory() {
  return (
    <>
      <h1 className="flex items-center gap-3">
        <History size={28} />
        Історія замовлень
      </h1>
      <MyOrders />
    </>
  );
}
