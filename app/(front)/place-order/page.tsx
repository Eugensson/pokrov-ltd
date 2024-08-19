import { Metadata } from "next";

import { PlaceOrderForm } from "./place-order-form";

export const metadata: Metadata = {
  title: "Підтвердження замовлення || ТОВ Покров",
};

export default async function PlaceOrderPage() {
  return <PlaceOrderForm />;
}
