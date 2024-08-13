"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag, ShoppingCart } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import useCartService from "@/lib/hooks/useCartStore";
import { ScrollArea } from "@/components/ui/scroll-area";

export const CartDetails = () => {
  const router = useRouter();

  const { items, itemsPrice, decrease, increase } = useCartService();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <div>
      <div className="flex justify-between items-center">
        <Breadcrumb className="my-5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-lg">
                Головна
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-lg">Кошик</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {items.length !== 0 && (
          <Button
            variant="ghost"
            size="lg"
            onClick={() => router.push("/shipping")}
            className="py-6 gap-2"
          >
            <ShoppingBag />
            Оформити
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center gap-10 p-10">
          <span className="flex items-center gap-4 text-4xl font-semibold">
            <ShoppingCart size={150} className="text-slate-500" />
            Кошик порожній.
          </span>
          <Button size="lg">
            <Link href="/catalog">Повернутися до каталогу</Link>
          </Button>
        </div>
      ) : (
        <ScrollArea className="h-[400px] w-full bg-primary-foreground rounded-md p-4">
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
                    {item.name}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="icon"
                        variant="link"
                        onClick={() => decrease(item)}
                      >
                        <Minus size={18} />
                      </Button>
                      <span className="px-2">{item.qty}</span>
                      <Button
                        type="button"
                        size="icon"
                        variant="link"
                        onClick={() => increase(item)}
                      >
                        <Plus size={18} />
                      </Button>
                    </div>
                  </TableCell>
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
                  ({items.reduce((a, c) => a + c.qty, 0)}) : &#8372;{" "}
                  {itemsPrice}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </ScrollArea>
      )}
    </div>
  );
};
