"use client";

import {
  FilePenLine,
  FilePlus2,
  FileX2,
  Loader,
  MoreHorizontal,
  Package,
} from "lucide-react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
import { Error } from "@/components/error";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/models/Product";
import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Products = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [value, setValue] = useState("Всі категорії");

  const { data: products, error } = useSWR(
    `/api/admin/products`,
    (url: string) => fetch(url).then((res) => res.json())
  );
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const { trigger: deleteProduct } = useSWRMutation(
    `/api/admin/products`,
    async (url, { arg }: { arg: { productId: string } }) => {
      const res = await fetch(`${url}/${arg.productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      res.ok
        ? toast({ title: "Продукт успішно видалено" })
        : toast({
            variant: "destructive",
            title: "Сталася помилка. Будь ласка, спробуйте ще раз.",
            description: data.message,
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
      if (!res.ok)
        return toast({
          variant: "destructive",
          title: "Сталася помилка. Будь ласка, спробуйте ще раз.",
          description: data.message,
        });

      toast({ title: "Продукт успішно створено" });
      router.push(`/products/${data.product._id}`);
    }
  );

  useEffect(() => {
    const filteredProducts = products?.filter((product: Product) =>
      value === "Всі категорії" ? true : product.category === value
    );

    setFilteredProducts(filteredProducts || []);
  }, [products, value]);

  if (error) return <Error href="/products" />;

  if (!products) return <Loading />;

  return (
    <div className="grid flex-1 gap-4 p-2 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="Всі категорії" className="md:pl-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-1">
          <TabsList className="hidden md:flex rounded-md">
            <TabsTrigger
              name="Всі категорії"
              value="Всі категорії"
              className="rounded-md"
              onClick={() => setValue("Всі категорії")}
            >
              Всі
            </TabsTrigger>
            <TabsTrigger
              value="Накупольні хрести"
              className="rounded-md"
              onClick={() => setValue("Накупольні хрести")}
            >
              Хрести
            </TabsTrigger>
            <TabsTrigger
              value="Декоративні елементи"
              className="rounded-md"
              onClick={() => setValue("Декоративні елементи")}
            >
              Декор
            </TabsTrigger>
            <TabsTrigger
              value="Куполи церковні"
              className="rounded-md"
              onClick={() => setValue("Куполи церковні")}
            >
              Куполи
            </TabsTrigger>
            <TabsTrigger
              value="Аркуші із нанесеним покриттям"
              className="rounded-md"
              onClick={() => setValue("Аркуші із нанесеним покриттям")}
            >
              Аркуші
            </TabsTrigger>
          </TabsList>
          <Button
            variant="ghost"
            className="h-10 gap-3"
            disabled={isCreating}
            onClick={() => createProduct()}
          >
            {isCreating ? <Loader className="animate-spin" /> : <FilePlus2 />}
            Додати
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 p-0">
              <Package size={20} />
              Товари
            </CardTitle>
          </CardHeader>
          <TabsContent value={value}>
            <CardContent>
              <ScrollArea className="w-[260px] md:w-[660px] lg:w-[910px] xl:w-full h-[300px] md:h-[400px] lg:h-[450px] whitespace-nowrap rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">
                        <span className="sr-only">Зображення</span>
                      </TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Найменування</TableHead>
                      <TableHead>Ціна/од,&#8372;</TableHead>
                      <TableHead>Категорія</TableHead>
                      <TableHead>Кількість</TableHead>
                      <TableHead>Рейтинг</TableHead>
                      <TableHead>
                        <span className="sr-only">Дії</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product: Product) => (
                      <TableRow key={product._id}>
                        <TableCell>
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
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.countInStock}</TableCell>
                        <TableCell>{product.rating}</TableCell>
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
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
};
