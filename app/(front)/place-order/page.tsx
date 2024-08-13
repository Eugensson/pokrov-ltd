import { Metadata } from "next";

import { PlaceOrderForm } from "./place-order-form";

export const metadata: Metadata = {
  title: "Place Order",
};

export default async function PlaceOrderPage() {
  return <PlaceOrderForm />;
}
