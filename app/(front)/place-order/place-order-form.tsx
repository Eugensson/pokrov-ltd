"use client";

import {
  Truck,
  Banknote,
  ShoppingCart,
  Loader,
  HandCoins,
  FilePenLine,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import useCartService from "@/lib/hooks/useCartStore";
import { CheckoutSteps } from "@/components/checkout-steps";

export const PlaceOrderForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    clear,
  } = useCartService();

  const { trigger: placeOrder, isMutating: isPlacing } = useSWRMutation(
    `/api/orders/mine`,
    async (url) => {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod,
          shippingAddress,
          items,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        clear();
        toast({ title: "Order placed successfully" });
        return router.push(`/order/${data.order._id}`);
      } else {
        toast({
          variant: "destructive",
          title: "Сталася помилка. Будь ласка, спробуйте ще раз.",
          description: data.message,
        });
      }
    }
  );

  useEffect(() => {
    if (!paymentMethod) {
      return router.push("/payment");
    }
    if (items.length === 0) {
      return router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, router]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <>
      <CheckoutSteps current={4} value={100} />
      <div className="grid md:grid-cols-4 md:gap-5 my-4">
        <div className="overflow-x-auto md:col-span-3 space-y-5">
          <div className="flex flex-col gap-4 bg-primary-foreground rounded-md p-5">
            <h2 className="flex items-center gap-4 font-semibold text-xl">
              <Truck size={28} />
              Адреса доставки
            </h2>
            <p>{shippingAddress.fullName}</p>
            <p>
              {shippingAddress.address}, {shippingAddress.city}
            </p>
            <p>
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
            <Button size="lg" className="max-w-40">
              <Link href="/shipping" className="flex items-center gap-3">
                <FilePenLine />
                Редагувати
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-4 bg-primary-foreground rounded-md p-5">
            <h2 className="flex items-center gap-4 font-semibold text-xl">
              <Banknote size={28} />
              Спосіб оплати
            </h2>
            <p>{paymentMethod}</p>
            <Button size="lg" className="max-w-40">
              <Link href="/payment" className="flex items-center gap-3">
                <FilePenLine />
                Редагувати
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-4 bg-primary-foreground rounded-md p-5">
            <h2 className="flex items-center gap-4 font-semibold text-xl">
              <ShoppingCart size={28} />
              Товари
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] md:text-lg"></TableHead>
                  <TableHead className="md:text-lg">Найменування</TableHead>
                  <TableHead className="md:text-lg">Кількість</TableHead>
                  <TableHead className="text-right md:text-lg">
                    Ціна/од., &#8372;
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={100}
                          height={100}
                        />
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium md:text-lg">
                      {item.name}({item.color} {item.size})
                    </TableCell>
                    <TableCell>{item.qty}</TableCell>
                    <TableCell className="text-right md:text-lg">
                      {item.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} className="md:text-lg">
                    Разом:
                  </TableCell>
                  <TableCell className="text-right md:text-lg">
                    &#8372; {itemsPrice}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <Button size="lg" className="max-w-40">
              <Link href="/cart" className="flex items-center gap-3">
                <FilePenLine />
                Редагувати
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-primary-foreground rounded-md p-5 max-h-96">
          <h2 className="flex items-center gap-4 font-semibold text-lg">
            <HandCoins size={28} />
            Підсумок замовлення
          </h2>
          <ul className="flex flex-col gap-4 ">
            <li>
              <div className=" flex justify-between">
                <div>Продукція</div>
                <div> &#8372; {itemsPrice}</div>
              </div>
            </li>
            <li>
              <div className=" flex justify-between">
                <div>Податок</div>
                <div> &#8372; {taxPrice}</div>
              </div>
            </li>
            <li>
              <div className=" flex justify-between">
                <div>Вартість доставки</div>
                <div> &#8372; {shippingPrice}</div>
              </div>
            </li>
            <li>
              <Separator className="my-5" />
              <div className=" flex justify-between">
                <div>Разом:</div>
                <div> &#8372; {totalPrice}</div>
              </div>
            </li>
          </ul>
          <Button
            onClick={() => placeOrder()}
            disabled={isPlacing}
            className=" w-full"
          >
            {isPlacing && <Loader className="animate-spin" />}
            Підтвердити
          </Button>
        </div>
      </div>
    </>
  );
};
