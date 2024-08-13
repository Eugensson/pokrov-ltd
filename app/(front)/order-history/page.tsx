import { Metadata } from "next";
import { History } from "lucide-react";

import MyOrders from "./my-orders";

export const metadata: Metadata = {
  title: "Order History",
};

export default function OrderHistory() {
  return (
    <>
      <h1 className="flex items-center gap-3 text-2xl my-6">
        <History size={28} />
        Історія замовлень
      </h1>
      <MyOrders />
    </>
  );
}
