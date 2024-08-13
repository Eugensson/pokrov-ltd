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

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function MyOrders() {
  const [mounted, setMounted] = useState(false);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: orders, error } = useSWR(`/api/orders/mine`, fetcher);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  if (error) return "Сталася помилка. Будь ласка, спробуй ще раз.";

  if (!orders) return "Завантаження...";

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>Список Ваших останніх замовлень.</TableCaption>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
