"use client";

import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AtSign, Eye, EyeOff, Github, Key, Loader } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type Inputs = {
  email: string;
  password: string;
};

export function LoginForm({ className, ...props }: LoginFormProps) {
  const router = useRouter();
  const params = useSearchParams();
  const { data: session } = useSession();
  let callbackUrl = params.get("callbackUrl") || "/";
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { email, password } = form;

    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <div className="relative">
              <Input
                id="email"
                type="text"
                autoComplete="off"
                disabled={isSubmitting}
                className="w-full px-10"
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
                autoComplete="off"
                className="w-full px-10"
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
          <Button disabled={isSubmitting} className="mt-4">
            {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Увійти
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
      <div className="flex items-center gap-4">
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
