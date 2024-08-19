"use client";

import useSWR from "swr";
import Link from "next/link";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Order } from "@/lib/models/Order";
import { Error } from "@/components/error";
import { Button } from "@/components/ui/button";

export default function MyOrders() {
  const [mounted, setMounted] = useState(false);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: orders, error } = useSWR(`/api/orders/mine`, fetcher);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  if (error) return <Error href="/order-history" />;

  if (!orders)
    return <Loader size={40} className="animate-spin mx-auto mt-48" />;

  return (
    <>
      {orders?.length > 0 ? (
        <Table>
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
            {orders.map((order: Order) => (
              <TableRow key={order._id}>
                <TableCell>... {order._id.substring(14, 24)}</TableCell>
                <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt
                    ? `${formatDate(order.paidAt)}`
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
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="mt-40 text-center">Історія замовлень порожня.</p>
      )}
    </>
  );
}
