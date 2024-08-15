"use client";

import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcStripe,
} from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { paymentMethods } from "@/constants";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useCartService from "@/lib/hooks/useCartStore";
import { CheckoutSteps } from "@/components/checkout-steps";

export const PaymentForm = () => {
  const router = useRouter();

  const { savePaymentMethod, paymentMethod, shippingAddress } =
    useCartService();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    savePaymentMethod(selectedPaymentMethod);

    router.push("/place-order");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }

    setSelectedPaymentMethod(paymentMethod || "PayPal");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <>
      <CheckoutSteps current={3} value={75} />
      <Card className="max-w-lg space-y-10 min-h-[400px] mx-auto">
        <CardHeader>
          <CardTitle>Спосіб оплати</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <ul className="flex flex-col gap-5">
              {paymentMethods.map((payment) => (
                <li key={payment}>
                  <Label className="flex items-center gap-4 cursor-pointer">
                    <Input
                      type="radio"
                      name="paymentMethod"
                      value={payment}
                      checked={selectedPaymentMethod === payment}
                      onChange={() => setSelectedPaymentMethod(payment)}
                      className="w-4 h-4"
                    />
                    {payment}
                  </Label>
                </li>
              ))}
            </ul>

            <div className="mt-20 flex items-center gap-10">
              <Button
                type="button"
                onClick={() => router.back()}
                className="flex-1"
              >
                Назад
              </Button>
              <Button type="submit" className="flex-1">
                Продовжити
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center items-center gap-10">
          <FaCcVisa size={40} className="text-slate-500" />
          <FaCcMastercard size={40} className="text-slate-500" />
          <FaCcPaypal size={40} className="text-slate-500" />
          <FaCcStripe size={40} className="text-slate-500" />
        </CardFooter>
      </Card>
    </>
  );
};
