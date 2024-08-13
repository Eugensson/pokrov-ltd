"use client";

import useSWR from "swr";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import {
  Loader,
  TriangleAlert,
  UserCheck,
  UserRoundPen,
  UserX,
} from "lucide-react";
import { ValidationRule, useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/lib/models/User";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { formatId } from "@/lib/utils";

export const CustomerEditForm = ({ userId }: { userId: string }) => {
  const router = useRouter();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: user, error } = useSWR(`/api/admin/users/${userId}`, fetcher);

  const { trigger: updateUser, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/users/${userId}`,
    async (url, { arg }) => {
      const res = await fetch(`${url}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success("Інформацію про користувача успішно оновлено");
      router.push("/customers");
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<User>();

  useEffect(() => {
    if (!user) return;
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("isAdmin", user.isAdmin);
  }, [user, setValue]);

  const formSubmit = async (formData: any) => {
    await updateUser(formData);
  };

  if (error)
    return (
      <main className="flex justify-center items-center h-[650px]">
        <h2 className="text-xl font-semibold text-red-500 flex items-center gap-3">
          <TriangleAlert size={40} />
          Сталася помилка. Будь ласка, спробуйте ще раз.
        </h2>
      </main>
    );

  if (!frames)
    return (
      <main className="flex justify-center items-center h-[650px]">
        <Loader size={40} className="animate-spin" />
      </main>
    );

  const FormInput = ({
    id,
    name,
    required,
    pattern,
    type,
  }: {
    id: keyof User;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
    type: string;
  }) => (
    <div>
      <Label htmlFor={id}>{name}</Label>
      <Input
        type={type}
        id={id}
        {...register(id, {
          required: required && `${name} is required`,
          pattern,
        })}
        className="input input-bordered w-full max-w-md"
      />
      {errors[id]?.message && (
        <span className="text-red-500">{errors[id]?.message}</span>
      )}
    </div>
  );

  return (
    <main className="flex justify-center items-center h-[650px]">
      <Card className="w-full max-w-lg p-10">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <UserRoundPen size={28} />
            Редагування даних
          </CardTitle>
          <CardDescription>
            Панель керування даними користувача з ID: {formatId(userId)}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(formSubmit)} className="space-y-8">
            <FormInput name="Name" id="name" type="text" required />
            <FormInput name="Email" id="email" type="email" required />
            <div className="md:flex my-3 items-center gap-3">
              <Label htmlFor="isAdmin">Адміністратор</Label>
              <Switch
                id="isAdmin"
                checked={!!watch("isAdmin")}
                onCheckedChange={(checked) => setValue("isAdmin", checked)}
              />
            </div>

            <div className="mt-10 flex items-center gap-10">
              <Button
                type="submit"
                disabled={isUpdating}
                size="lg"
                className="flex-1 gap-3"
              >
                {isUpdating ? (
                  <Loader className="animate-spin" />
                ) : (
                  <UserCheck />
                )}
                Оновити
              </Button>
              <Button type="button" size="lg" className="flex-1">
                <Link href="/customers" className="flex items-center gap-3">
                  <UserX />
                  Відхилити
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};
