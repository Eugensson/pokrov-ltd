"use client";

import {
  ArrowDownToLine,
  Ban,
  Loader,
  PackageOpen,
  RotateCw,
} from "lucide-react";
import useSWR from "swr";
import Link from "next/link";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ValidationRule, useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatId } from "@/lib/utils";
import { Error } from "@/components/error";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/loading";
import { Product } from "@/lib/models/Product";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const EditProductForm = ({ productId }: { productId: string }) => {
  const router = useRouter();
  const { toast } = useToast();

  const { data: product, error } = useSWR(
    `/api/admin/products/${productId}`,
    (url: string) => fetch(url).then((res) => res.json())
  );

  const [selectedCategory, setSelectedCategory] = useState<string>(
    product?.category || "Накупольні хрести"
  );

  const { trigger: updateProduct, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/products/${productId}`,
    async (url, { arg }) => {
      const res = await fetch(`${url}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      });
      const data = await res.json();
      if (!res.ok)
        return toast({
          variant: "destructive",
          title: "Сталася помилка. Будь ласка, спробуйте ще раз.",
          description: data.message,
        });

      toast({ title: "Відомості про товар успішно оновлено" });
      router.push("/products");
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Product>();

  useEffect(() => {
    if (!product) return;
    setValue("name", product.name);
    setValue("slug", product.slug);
    setValue("price", product.price);
    setValue("image", product.image);
    setValue("category", selectedCategory);
    setValue("brand", product.brand);
    setValue("countInStock", product.countInStock);
    setValue("description", product.description);
  }, [product, selectedCategory, setValue]);

  const formSubmit = async (formData: any) => {
    await updateProduct(formData);
  };

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof Product;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <Label className="flex flex-col gap-2">
      <span className="flex items-center gap-2">
        {name}
        {errors[id]?.message && (
          <div className="text-xs text-red-500 dark:text-red-300">
            {errors[id]?.message}
          </div>
        )}
      </span>
      <Input
        type="text"
        {...register(id, {
          required: required && " - обов'язкове поле",
          pattern,
        })}
      />
    </Label>
  );

  const uploadHandler = async (e: any) => {
    try {
      const resSign = await fetch("/api/cloudinary-sign", {
        method: "POST",
      });
      const { signature, timestamp } = await resSign.json();
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setValue("image", data.secure_url);
      toast({ title: "Файл успішно завантажено" });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Сталася помилка. Будь ласка, спробуйте ще раз.",
        description: err.message,
      });
    }
  };

  if (error) return <Error href={`/products/${productId}`} />;

  if (!product) return <Loading />;

  return (
    <div className="flex justify-center items-center h-[580px]">
      <Card className="w-full max-w-5xl p-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <PackageOpen size={28} />
            Редагувати товар
          </CardTitle>
          <CardDescription>
            Редагування інформації про товар з ID: {formatId(productId)}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="space-y-4 grid md:grid-cols-2 gap-10"
          >
            <div className="space-y-4">
              <Label className="flex justify-between items-center">
                Категорія
                <Select
                  disabled={isUpdating}
                  name="category"
                  required
                  value={selectedCategory}
                  onValueChange={(value) => setSelectedCategory(value)}
                >
                  <SelectTrigger className="w-3/4">
                    <SelectValue placeholder="Оберіть категорію" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Накупольні хрести">
                      Накупольні хрести
                    </SelectItem>
                    <SelectItem value="Куполи церковні">
                      Куполи церковні
                    </SelectItem>
                    <SelectItem value="Декоративні елементи">
                      Декоративні елементи
                    </SelectItem>
                    <SelectItem value="Аркуші із нанесеним покриттям">
                      Аркуші із нанесеним покриттям
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Label>
              <FormInput name="Найменування" id="name" required />
              <FormInput name="Слаг" id="slug" required />
              <FormInput name="Бренд виробника" id="brand" required />
              <FormInput
                name="Доступна кількість, од."
                id="countInStock"
                required
              />
            </div>
            <div className="space-y-4">
              <FormInput name="Ціна за одиницю, ₴" id="price" required />
              <FormInput name="Зображення" id="image" required />
              <Label className="flex justify-between items-center gap-2">
                <ArrowDownToLine />
                <Input
                  type="file"
                  onChange={uploadHandler}
                  className="w-3/5 cursor-pointer"
                />
              </Label>
              <FormInput name="Опис продукту" id="description" required />

              <div className="mt-20 flex items-center gap-10">
                <Button
                  type="submit"
                  disabled={isUpdating}
                  size="lg"
                  className="flex-1 gap-3"
                >
                  {isUpdating ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <RotateCw />
                  )}
                  Оновити
                </Button>
                <Button type="button" size="lg" className="flex-1">
                  <Link href="/products" className="flex items-center gap-3">
                    <Ban />
                    Відхилити
                  </Link>
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
