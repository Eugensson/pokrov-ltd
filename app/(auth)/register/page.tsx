import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { RegisterForm } from "@/app/(auth)/register/register-form";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function Register() {
  return (
    <div className="relative grid md:grid-cols-2 h-screen flex-col items-center justify-center lg:max-w-none lg:px-0">
      <Button
        variant="ghost"
        className="absolute right-4 top-4 md:right-8 md:top-8"
      >
        <Link href="/login">Увійти</Link>
      </Button>
      <div className="relative hidden h-full flex-col text-white dark:border-r md:flex bg-primary">
        <Image
          src="/auth.jpg"
          alt="The company's products"
          width={1200}
          height={1200}
          priority
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-8">
        <div className="mx-auto px-4 flex w-full flex-col justify-center space-y-8 sm:w-[350px]">
          <h1 className="flex items-center gap-2 mx-auto md:text-xl font-semibold tracking-tight">
            <ShieldCheck size={26} />
            Реєстрація
          </h1>
          <RegisterForm />
          <p className="text-center text-xs text-muted-foreground">
            Натискаючи продовжити, Ви погоджуєтеся з нашими{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Умовами користання ресурсом
            </Link>{" "}
            та{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Політикою конфіденційності
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
