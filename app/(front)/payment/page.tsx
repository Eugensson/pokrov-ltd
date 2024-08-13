import { Metadata } from "next";

import { PaymentForm } from "./payment-form";

export const metadata: Metadata = {
  title: "Payment Method",
};

export default async function PaymentPage() {
  return <PaymentForm />;
}
