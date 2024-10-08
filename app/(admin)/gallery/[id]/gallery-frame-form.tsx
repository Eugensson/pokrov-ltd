"use client";

import useSWR from "swr";
import Link from "next/link";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ValidationRule, useForm } from "react-hook-form";
import { BookImage, ImageMinus, ImagePlus, Loader } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Frame } from "@/lib/models/Frame";
import { Error } from "@/components/error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const EditGalleryFrameForm = ({ frameId }: { frameId: string }) => {
  const router = useRouter();
  const { toast } = useToast();

  const { data: frame, error } = useSWR(
    `/api/admin/gallery/${frameId}`,
    (url: string) => fetch(url).then((res) => res.json())
  );

  const [selectedCategory, setSelectedCategory] = useState<string>(
    frame?.category || "Накупольні хрести"
  );

  const { trigger: updateFrame, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/gallery/${frameId}`,
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

      toast({
        title: "Світлину успішно оновлено",
      });

      router.push("/gallery");
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Frame>();

  useEffect(() => {
    if (!frame) return;
    setValue("title", frame.title);
    setValue("image", frame.image);
    setValue("category", selectedCategory);
    setValue("description", frame.description);
  }, [frame, selectedCategory, setValue]);

  useEffect(() => {
    if (selectedCategory) {
      setValue(
        "cat",
        selectedCategory === "Накупольні хрести"
          ? "cross"
          : selectedCategory === "Куполи церковні"
          ? "domes"
          : selectedCategory === "Декоративні елементи"
          ? "decor"
          : selectedCategory === "Аркуші із нанесеним покриттям"
          ? "sheets"
          : ""
      );
    }
  }, [selectedCategory, setValue]);

  const formSubmit = async (formData: any) => {
    await updateFrame(formData);
  };

  if (error) return <Error href={`/gallery/${frameId}`} />;

  if (!frame)
    return <Loader size={40} className="animate-spin mx-auto mt-48" />;

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof Frame;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <Label className="flex flex-col gap-2">
      {name}
      <Input
        type="text"
        {...register(id, {
          required: required && `${name} обов'язкове поле`,
          pattern,
        })}
        className="input input-bordered w-full max-w-md"
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

  return (
    <div className="flex justify-center items-center h-[580px]">
      <Card className="w-full max-w-lg md:p-10">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <BookImage size={28} />
            Редагувати
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
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
            <FormInput name="Заголовок" id="title" required />
            <FormInput name="Опис" id="description" required />
            <FormInput name="Зображення" id="image" required />
            <Label className="flex justify-between items-center cursor-pointer">
              Оновити
              <Input type="file" className="w-3/5" onChange={uploadHandler} />
            </Label>
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
                  <ImagePlus />
                )}
                <span className="hidden md:block">Оновити</span>
              </Button>
              <Button type="button" size="lg" className="flex-1">
                <Link href="/gallery" className="flex items-center gap-3">
                  <ImageMinus />
                  <span className="hidden md:block">Відхилити</span>
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
