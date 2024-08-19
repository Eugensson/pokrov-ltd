import { Metadata } from "next";

import { ShippingForm } from "./shipping-form";

export const metadata: Metadata = {
  title: "Адреса доставки || ТОВ Покров",
};

export default async function ShippingPage() {
  return <ShippingForm />;
}
