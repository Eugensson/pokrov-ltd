"use client";

import {
  Loader,
  RefreshCw,
  ShoppingCart,
  TriangleAlert,
  Info,
  MoreHorizontal,
} from "lucide-react";
import useSWR from "swr";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Order } from "@/lib/models/Order";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Orders = () => {
  const { data: orders, error } = useSWR(`/api/admin/orders`, (url: string) =>
    fetch(url).then((res) => res.json())
  );

  if (error)
    return (
      <div className="flex flex-col justify-center gap-10 items-center min-h-[580px]">
        <h2 className="text-xl font-semibold text-destructive dark:text-red-400 flex items-center gap-3">
          <TriangleAlert size={40} />
          Сталася помилка. Будь ласка, оновіть сторінку.
        </h2>
        <Button type="button" size="lg">
          <Link href="/orders" className="flex items-center gap-3">
            <RefreshCw />
            Оновити
          </Link>
        </Button>
      </div>
    );

  if (!orders)
    return (
      <div className="flex justify-center items-center min-h-[580px]">
        <Loader size={40} className="animate-spin" />
      </div>
    );

  return (
    <section>
      <Card className="grid auto-rows-max lg:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-2xl mb-4">
            <ShoppingCart size={28} />
            Замовлення
          </CardTitle>
          <CardDescription className="text-balance max-w-2xl leading-relaxed">
            інформаційна панель динамічних замовлень для безперервного керування
            та аналізу.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Користувач</TableHead>
                <TableHead>Дата замовлення</TableHead>
                <TableHead>Вартість замовлення, &#8372;</TableHead>
                <TableHead>Статус оплати</TableHead>
                <TableHead>Статус доставки</TableHead>
                <TableHead>
                  <span className="sr-only">Дії</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order: Order) => (
                  <TableRow
                    key={order._id}
                    className={cn(
                      order.isPaid && order.isDelivered ? "" : "bg-accent"
                    )}
                  >
                    <TableCell>..{order._id.substring(14, 24)}</TableCell>
                    <TableCell>{order.user?.name || "Deleted user"}</TableCell>
                    <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                    <TableCell>{order.totalPrice}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "text-xs",
                          order.isPaid ? "text-green-500" : "text-red-500"
                        )}
                        variant="outline"
                      >
                        {order.isPaid && order.paidAt
                          ? `Сплачено ${order.paidAt.substring(0, 10)}`
                          : "Не сплачено"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "text-xs",
                          order.isPaid ? "text-green-500" : "text-red-500"
                        )}
                        variant="outline"
                      >
                        {order.isDelivered && order.deliveredAt
                          ? `Доставлено ${order.deliveredAt.substring(0, 10)}`
                          : "Не доставлено"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Дії</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Button type="button" variant="link">
                              <Link
                                href={`/order/${order._id}`}
                                className="flex items-center gap-3"
                              >
                                <Info />
                                Детальніше
                              </Link>
                            </Button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-[350px] text-center">
                    Список замовлень порожній.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
};
