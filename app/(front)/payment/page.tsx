import { Metadata } from "next";

import { PaymentForm } from "./payment-form";

export const metadata: Metadata = {
  title: "Спосіб оплати || ТОВ Покров",
};

export default async function PaymentPage() {
  return <PaymentForm />;
}
