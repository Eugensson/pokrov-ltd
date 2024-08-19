"use client";

import useSWR from "swr";
import Link from "next/link";
import { useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { ValidationRule, useForm } from "react-hook-form";
import { Loader, UserCheck, UserRoundPen, UserX } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatId } from "@/lib/utils";
import { User } from "@/lib/models/User";
import { Error } from "@/components/error";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

export const CustomerEditForm = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const { toast } = useToast();

  const { data: user, error } = useSWR(
    `/api/admin/users/${userId}`,
    (url: string) => fetch(url).then((res) => res.json())
  );

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
      if (!res.ok)
        return toast({
          variant: "destructive",
          title: "Сталася помилка. Будь ласка, спробуйте ще раз.",
          description: data.message,
        });

      toast({
        title: "Інформацію про користувача успішно оновлено",
      });

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

  if (error) return <Error href={`/customers/${userId}`} />;

  if (!user) return <Loading />;

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
    <div className="flex justify-center items-center h-[650px]">
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
    </div>
  );
};
