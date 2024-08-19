import { Metadata } from "next";

import { CartDetails } from "@/app/(front)/cart/cart-details";

export const metadata: Metadata = {
  title: "Кошик || ТОВ Покров",
};

export default function Cart() {
  return <CartDetails />;
}
