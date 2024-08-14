"use client";

import {
  AtSign,
  Eye,
  EyeOff,
  Key,
  Loader,
  RefreshCcw,
  UserRound,
  UserRoundCog,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const ProfileForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session, update } = useSession();
  const [isVisiblePass, setIsVisiblePass] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session && session.user) {
      setValue("name", session.user.name!);
      setValue("email", session.user.email!);
    }
  }, [router, session, setValue]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.status === 200) {
        toast({
          title: "Дані профілю успішно оновлено",
        });

        const newSession = {
          ...session,
          user: {
            ...session?.user,
            name,
            email,
          },
        };

        await update(newSession);
      } else {
        toast({
          variant: "destructive",
          title: "Сталася помилка. Будь ласка, спробуйте ще раз.",
        });
      }
    } catch (err: any) {
      const error =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;

      toast({
        variant: "destructive",
        title: "Сталася помилка. Будь ласка, спробуйте ще раз.",
        description: error,
      });
    }
  };

  const toggleVisblePass = () => setIsVisiblePass((prev) => !prev);

  return (
    <Card className="max-w-md m-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <UserRoundCog size={28} />
          Редагування профілю
        </CardTitle>
        <CardDescription>Редагування даних користувача.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
          <Label className="flex flex-col gap-2">
            <span className="flex items-center gap-2">
              П.І.Б.
              {errors.name?.message && (
                <div className="text-xs text-red-500 dark:text-red-300">
                  {errors.name.message}
                </div>
              )}
            </span>
            <div className="relative">
              <Input
                type="text"
                id="name"
                {...register("name", {
                  required: "- обов'язкове поле",
                })}
                className="pl-10"
              />
              <UserRound className="absolute top-1/2 left-2 -translate-y-1/2 text-slate-500" />
            </div>
          </Label>
          <Label className="flex flex-col gap-2">
            <span className="flex items-center gap-2">
              Електронна пошта
              {errors.email?.message && (
                <div className="text-xs text-red-500 dark:text-red-300">
                  {errors.email.message}
                </div>
              )}
            </span>
            <div className="relative">
              <Input
                type="text"
                id="email"
                {...register("email", {
                  required: "- обов'язкове поле",
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "- некорректний формат",
                  },
                })}
                className="pl-10"
              />
              <AtSign className="absolute top-1/2 left-2 -translate-y-1/2 text-slate-500" />
            </div>
          </Label>

          <Label className="flex flex-col gap-2">
            <span className="flex items-center gap-2">
              Новий пароль
              {errors.password?.message && (
                <div className="text-xs text-red-500 dark:text-red-300">
                  {errors.password.message}
                </div>
              )}
            </span>
            <div className="relative">
              <Input
                type={isVisiblePass ? "text" : "password"}
                id="password"
                {...register("password", {})}
                className="px-10"
              />
              <Key className="absolute top-1/2 left-2 -translate-y-1/2 text-slate-500" />
              {isVisiblePass ? (
                <EyeOff
                  onClick={toggleVisblePass}
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-slate-500 cursor-pointer"
                />
              ) : (
                <Eye
                  onClick={toggleVisblePass}
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-slate-500 cursor-pointer"
                />
              )}
            </div>
          </Label>

          <Label className="flex flex-col gap-2">
            <span className="flex items-center gap-2">
              Підтвердіть пароль
              {errors.confirmPassword?.message && (
                <div className="text-xs text-red-500 dark:text-red-300">
                  {errors.confirmPassword.message}
                </div>
              )}
            </span>
            <div className="relative">
              <Input
                type={isVisiblePass ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword", {
                  validate: (value) => {
                    const { password } = getValues();
                    return password === value || " - паролі не співпадають";
                  },
                })}
                className="px-10"
              />
              <Key className="absolute top-1/2 left-2 -translate-y-1/2 text-slate-500" />
            </div>
          </Label>

          <Button
            size="lg"
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-3 mx-auto"
          >
            {isSubmitting ? (
              <Loader className="animate-spin" />
            ) : (
              <RefreshCcw />
            )}
            Оновити профіль
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
