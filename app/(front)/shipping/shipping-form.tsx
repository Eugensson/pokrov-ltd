"use client";

import { useEffect } from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, ValidationRule, useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShippingAddress } from "@/lib/models/Order";
import useCartService from "@/lib/hooks/useCartStore";
import { CheckoutSteps } from "@/components/checkout-steps";

export const ShippingForm = () => {
  const router = useRouter();

  const { shippingAddress, saveShippingAddrress } = useCartService();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ShippingAddress>({
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const formSubmit: SubmitHandler<ShippingAddress> = async (form) => {
    saveShippingAddrress(form);
    router.push("/payment");
  };

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof ShippingAddress;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className="mb-2">
      <Label htmlFor={id}>{name}</Label>
      <Input
        type="text"
        id={id}
        {...register(id, {
          required: required && `${name} is required`,
          pattern,
        })}
        disabled={isSubmitting}
      />
      {errors[id]?.message && (
        <div className="mt-2 text-xs text-red-500">
          {name} - обов&apos;язкове до заповлення поле
        </div>
      )}
    </div>
  );

  return (
    <>
      <CheckoutSteps current={2} value={50} />
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Адреса доставки</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(formSubmit)}>
            <FormInput name="П.І.Б." id="fullName" required />
            <FormInput name="Адреса доставки" id="address" required />
            <FormInput name="Місто" id="city" required />
            <FormInput name="Поштовий індекс" id="postalCode" required />
            <FormInput name="Країна" id="country" required />

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full gap-2 mt-5"
            >
              {isSubmitting && <Loader size={20} className="animate-spin" />}
              Продовжити
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-slate-950 dark:text-slate-500">
            Адресна доставка здійснюється кур&apos;єром компанії по місту
            Черкаси. Доставка відбувається протягом 2-3 робочих днів після
            попередньої оплати та за наявності товару на складі (уточнюється у
            менеджера після оформлення замовлення).
          </p>
        </CardFooter>
      </Card>
    </>
  );
};
