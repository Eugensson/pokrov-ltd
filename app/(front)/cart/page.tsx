import { Metadata } from "next";

import { CartDetails } from "@/app/(front)/cart/cart-details";

export const metadata: Metadata = {
  title: "Shopping Cart",
};

export default function Cart() {
  return <CartDetails />;
}
