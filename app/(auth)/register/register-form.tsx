"use client";

import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { AtSign, Eye, EyeOff, Github, Key, Loader, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const params = useSearchParams();
  const { data: session } = useSession();
  let callbackUrl = params.get("callbackUrl") || "/";
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        return router.push(
          `/signin?callbackUrl=${callbackUrl}&success=Account has been created`
        );
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (err: any) {
      const error =
        err.message && err.message.indexOf("E11000") === 0
          ? "Email is duplicate"
          : err.message;

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong. Please try again.",
        description: `${error}` || "error",
      });
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <div className="relative">
              <Input
                type="text"
                disabled={isSubmitting}
                placeholder="John Doe"
                {...register("name", {
                  required: "*Обов'язкове до заповлення поле",
                })}
                className="w-full max-w-sm px-10"
              />
              <User
                size={18}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
            {errors.name?.message && (
              <div className="text-xs text-destructive my-1 dark:text-red-200">
                {errors.name.message}
              </div>
            )}
          </div>
          <div className="grid gap-1">
            <div className="relative">
              <Input
                id="email"
                type="text"
                disabled={isSubmitting}
                className="w-full max-w-sm px-10"
                placeholder="john.doe@example.com"
                {...register("email", {
                  required: "*Обов'язкове до заповлення поле",
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Email is invalid",
                  },
                })}
              />
              <AtSign
                size={18}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
            {errors.email?.message && (
              <div className="text-xs text-destructive my-1 dark:text-red-200">
                {errors.email.message}
              </div>
            )}
          </div>
          <div className="grid gap-1">
            <div className="relative">
              <Input
                type={isVisible ? "text" : "password"}
                disabled={isSubmitting}
                className="w-full max-w-sm px-10"
                placeholder="********"
                {...register("password", {
                  required: "*Обов'язкове до заповлення поле",
                })}
              />
              <Key
                size={18}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500"
              />
              {isVisible ? (
                <EyeOff
                  size={18}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer"
                  onClick={() => setIsVisible((prevState) => !prevState)}
                />
              ) : (
                <Eye
                  size={18}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer"
                  onClick={() => setIsVisible((prevState) => !prevState)}
                />
              )}
            </div>
            {errors.password?.message && (
              <div className="text-xs text-destructive my-1 dark:text-red-200">
                {errors.password.message}
              </div>
            )}
          </div>
          <div className="grid gap-1">
            <div className="relative">
              <Input
                type={isVisible ? "text" : "password"}
                disabled={isSubmitting}
                className="w-full max-w-sm px-10"
                placeholder="********"
                {...register("confirmPassword", {
                  required: "*Обов'язкове до заповлення поле",
                  validate: (value) => {
                    const { password } = getValues();
                    return password === value || "Паролі повинні співпадати!";
                  },
                })}
              />
              <Key
                size={18}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
            {errors.confirmPassword?.message && (
              <div className="text-xs text-destructive my-1 dark:text-red-200">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting} className="mt-4">
            {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Зареєструватися
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            або за допомогою
          </span>
        </div>
      </div>
      <div className="flex items-center gap2">
        <Button
          variant="outline"
          type="button"
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? (
            <Loader className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Github className="mr-2 h-5 w-5" />
          )}{" "}
          GitHub
        </Button>

        <Button
          variant="outline"
          type="button"
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? (
            <Loader className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <FcGoogle className="mr-2 h-5 w-5" />
          )}{" "}
          Google
        </Button>
      </div>
    </div>
  );
}
