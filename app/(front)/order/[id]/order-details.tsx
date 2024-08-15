"use client";

import {
  Banknote,
  CircleCheck,
  CircleX,
  FileText,
  HandCoins,
  Loader,
  ShoppingCart,
  Truck,
} from "lucide-react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import { useSession } from "next-auth/react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

import { formatDate } from "@/lib/utils";
import { OrderItem } from "@/lib/models/Order";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function OrderDetails({
  orderId,
  paypalClientId,
}: {
  orderId: string;
  paypalClientId: string;
}) {
  const { trigger: deliverOrder, isMutating: isDelivering } = useSWRMutation(
    `/api/orders/${orderId}`,
    async (url) => {
      const res = await fetch(`/api/admin/orders/${orderId}/deliver`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      res.ok
        ? toast.success("Замовлення доставлено")
        : toast.error(data.message);
    }
  );

  const { trigger: paidOrder, isMutating: isPaiding } = useSWRMutation(
    `/api/orders/${orderId}`,
    async (url) => {
      const res = await fetch(`/api/admin/orders/${orderId}/paid`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      res.ok ? toast.success("Замовлення оплачено") : toast.error(data.message);
    }
  );

  const { data: session } = useSession();

  function createPayPalOrder() {
    return fetch(`/api/orders/${orderId}/create-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((order) => order.id);
  }

  function onApprovePayPalOrder(data: any) {
    return fetch(`/api/orders/${orderId}/capture-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((orderData) => {
        toast.success("Order paid successfully");
      });
  }

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(`/api/orders/${orderId}`, fetcher);

  if (error) return error.message;

  if (!data) return "Завантаження...";

  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isDelivered,
    deliveredAt,
    isPaid,
    paidAt,
  } = data;

  return (
    <div>
      <h1 className="flex items-center gap-3 text-2xl my-6">
        <FileText size={28} />
        ID замовлення: {orderId}
      </h1>
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
            {isDelivered ? (
              <p className="flex items-center gap-2 text-green-500">
                <CircleCheck size={24} />
                Доставлено {formatDate(deliveredAt)}
              </p>
            ) : (
              <p className="flex items-center gap-2 text-red-500">
                <CircleX size={24} />
                Товар не доставлений
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4 bg-primary-foreground rounded-md p-5">
            <h2 className="flex items-center gap-4 font-semibold text-xl">
              <Banknote size={28} />
              Спосіб оплати
            </h2>
            <p>{paymentMethod}</p>
            {isPaid ? (
              <p className="flex items-center gap-2 text-green-500">
                <CircleCheck size={24} />
                Товар сплачено {formatDate(paidAt)}
              </p>
            ) : (
              <p className="flex items-center gap-2 text-red-500">
                <CircleX size={24} />
                Товар не оплачений
              </p>
            )}
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
                {items.map((item: OrderItem) => (
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
          </div>
        </div>

        <div className="flex flex-col justify-between bg-primary-foreground rounded-md p-5 ">
          <h2 className="flex items-center gap-4 font-semibold text-lg">
            <HandCoins size={28} />
            Підсумок замовлення
          </h2>
          <ul className="flex flex-col gap-4 ">
            <li>
              <div className="flex justify-between">
                <div>Продукція</div>
                <div> &#8372; {itemsPrice}</div>
              </div>
            </li>
            <li>
              <div className="flex justify-between">
                <div>Податок</div>
                <div> &#8372; {taxPrice}</div>
              </div>
            </li>
            <li>
              <div className="flex justify-between">
                <div>Вартість доставки</div>
                <div> &#8372; {shippingPrice}</div>
              </div>
            </li>
            <li>
              <Separator className="my-5" />
              <div className="flex justify-between">
                <div>Разом:</div>
                <div> &#8372; {totalPrice}</div>
              </div>
            </li>
          </ul>

          {!isPaid && paymentMethod === "PayPal" && (
            <PayPalScriptProvider options={{ clientId: paypalClientId }}>
              <PayPalButtons
                createOrder={createPayPalOrder}
                onApprove={onApprovePayPalOrder}
              />
            </PayPalScriptProvider>
          )}
          <div className="flex flex-col gap-4">
            {session?.user.isAdmin && (
              <Button
                size="lg"
                className="w-full"
                onClick={() => paidOrder()}
                disabled={isPaiding}
              >
                {isPaiding && <Loader className="animate-spin" />}
                Позначити &quot;Оплачено&quot;
              </Button>
            )}
            {session?.user.isAdmin && (
              <Button
                size="lg"
                className="w-full"
                onClick={() => deliverOrder()}
                disabled={isDelivering}
              >
                {isDelivering && <Loader className="animate-spin" />}
                Позначити &quot;Доставлено&quot;
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
