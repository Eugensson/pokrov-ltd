"use client";

import useSWR from "swr";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/lib/models/Order";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Loader, RefreshCcw, TriangleAlert } from "lucide-react";

export default function MyOrders() {
  const [mounted, setMounted] = useState(false);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: orders, error } = useSWR(`/api/orders/mine`, fetcher);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  if (error)
    return (
      <div className="flex flex-col justify-center gap-10 items-center min-h-[420px]">
        <h2 className="text-xl font-semibold text-red-500 flex items-center gap-3">
          <TriangleAlert size={40} />
          Сталася помилка. Будь ласка, спробуйте ще раз.
        </h2>
        <Button type="button" size="lg">
          <Link href="/order-history" className="flex items-center gap-3">
            <RefreshCcw />
            Оновити
          </Link>
        </Button>
      </div>
    );

  if (!orders)
    return (
      <div className="flex justify-center items-center min-h-[420px]">
        <Loader size={40} className="animate-spin" />
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption className="mb-auto">
          Список Ваших останніх замовлень.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="flex-1">ID</TableHead>
            <TableHead className="flex-1">Дата</TableHead>
            <TableHead className="flex-1">Сума, &#8372;</TableHead>
            <TableHead className="flex-1">Оплата</TableHead>
            <TableHead className="flex-1">Доставка</TableHead>
            <TableHead className="text-right flex-1">Інформація</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order: Order) => (
              <TableRow key={order._id}>
                <TableCell>... {order._id.substring(14, 24)}</TableCell>
                <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt
                    ? `${order.paidAt.substring(0, 10)}`
                    : "Оплата не виконана"}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt
                    ? `${formatDate(order.deliveredAt)}`
                    : "Не доставлено"}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="link" className="pr-0">
                    <Link href={`/order/${order._id}`} passHref>
                      Подробиці
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-[350px] text-center">
                У Вашому списку замовлень немає.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
