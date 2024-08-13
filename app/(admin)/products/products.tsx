"use client";

import {
  FilePenLine,
  FilePlus2,
  FileX2,
  Loader,
  MoreHorizontal,
  Package,
  TriangleAlert,
} from "lucide-react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatId } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/models/Product";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Products = () => {
  const router = useRouter();
  const [value, setValue] = useState("Всі категорії");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: products, error } = useSWR(`/api/admin/products`, fetcher);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const { trigger: deleteProduct } = useSWRMutation(
    `/api/admin/products`,
    async (url, { arg }: { arg: { productId: string } }) => {
      const toastId = toast.loading("Видалення товару...");

      const res = await fetch(`${url}/${arg.productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      res.ok
        ? toast.success("Продукт успішно видалено", {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          });
    }
  );

  const { trigger: createProduct, isMutating: isCreating } = useSWRMutation(
    `/api/admin/products`,
    async (url) => {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success("Продукт створено успішно");
      router.push(`/products/${data.product._id}`);
    }
  );

  useEffect(() => {
    const filteredProducts = products?.filter((product: Product) =>
      value === "Всі категорії" ? true : product.category === value
    );

    setFilteredProducts(filteredProducts || []);
  }, [products, value]);

  if (error)
    return (
      <main className="flex justify-center items-center h-[650px]">
        <h2 className="text-xl font-semibold text-red-500 flex items-center gap-3">
          <TriangleAlert size={40} />
          Сталася помилка. Будь ласка, спробуйте ще раз.
        </h2>
      </main>
    );

  if (!products)
    return (
      <main className="flex justify-center items-center h-[650px]">
        <Loader size={40} className="animate-spin" />
      </main>
    );

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="Всі категорії">
        <div className="flex items-center justify-between p-1">
          <TabsList className="rounded-md">
            <TabsTrigger
              name="Всі категорії"
              value="Всі категорії"
              className="rounded-md"
              onClick={() => setValue("Всі категорії")}
            >
              Всі категорії
            </TabsTrigger>
            <TabsTrigger
              value="Накупольні хрести"
              className="rounded-md"
              onClick={() => setValue("Накупольні хрести")}
            >
              Накупольні хрести
            </TabsTrigger>
            <TabsTrigger
              value="Декоративні елементи"
              className="rounded-md"
              onClick={() => setValue("Декоративні елементи")}
            >
              Декоративні елементи
            </TabsTrigger>
            <TabsTrigger
              value="Куполи церковні"
              className="rounded-md"
              onClick={() => setValue("Куполи церковні")}
            >
              Куполи церковні
            </TabsTrigger>
            <TabsTrigger
              value="Аркуші із нанесеним покриттям"
              className="rounded-md"
              onClick={() => setValue("Аркуші із нанесеним покриттям")}
            >
              Аркуші із нанесеним покриттям
            </TabsTrigger>
          </TabsList>
          <Button
            variant="outline"
            className="h-10 gap-3"
            disabled={isCreating}
            onClick={() => createProduct()}
          >
            {isCreating ? <Loader className="animate-spin" /> : <FilePlus2 />}
            Створити
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Package size={28} />
              Товари
            </CardTitle>
            <CardDescription>
              Панель керування товарами (додавання, редагування та видалення).
            </CardDescription>
          </CardHeader>
          <TabsContent value={value}>
            <CardContent>
              <ScrollArea className="h-[380px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Зображення</span>
                      </TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Найменування</TableHead>
                      <TableHead>Ціна/од., &#8372;</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Категорія
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Кількість
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Рейтинг
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Дії</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product: Product) => (
                      <TableRow key={product._id}>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            src={product.image}
                            alt={product.name}
                            className="aspect-square rounded-md object-cover"
                            width={64}
                            height={64}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatId(product._id!)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.name}</Badge>
                        </TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {product.category}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {product.countInStock}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {product.rating}
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
                                    href={`/products/${product._id}`}
                                    className="flex items-center gap-3"
                                  >
                                    <FilePenLine />
                                    Редагувати
                                  </Link>
                                </Button>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Button
                                  onClick={() =>
                                    deleteProduct({
                                      productId: product._id!,
                                    })
                                  }
                                  type="button"
                                  variant="link"
                                  className="flex items-center gap-3"
                                >
                                  <FileX2 />
                                  Видалити
                                </Button>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>
    </main>
  );
};
