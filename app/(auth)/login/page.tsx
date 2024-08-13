import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { LoginForm } from "@/app/(auth)/login/login-form";
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
        <Link href="/register">Зареєструватися</Link>
      </Button>
      <div className="relative hidden h-full flex-col text-white dark:border-r md:flex bg-primary">
        <Image
          src="/auth.jpg"
          alt="The company's products"
          width={600}
          height={600}
          priority
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex px-4 w-full flex-col justify-center space-y-8 sm:w-[350px]">
          <h1 className="flex items-center gap-2 mx-auto md:text-xl font-semibold tracking-tight">
            <ShieldCheck size={26} />
            Вхід
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
