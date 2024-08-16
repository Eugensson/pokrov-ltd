import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LoginForm } from "@/app/(auth)/login/login-form";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function Register() {
  return (
    <div className="relative flex w-full max-w-4xl rounded-md border shadow-md dark:shadow-slate-500/30 overflow-hidden h-screen md:h-auto">
      <Button variant="ghost" className="absolute right-4 top-4 ">
        <Link href="/register">Зареєструватися</Link>
      </Button>
      <Image
        src="/auth.jpg"
        alt="The company's products"
        width={600}
        height={600}
        priority
        className="hidden md:block object-contain w-1/2 h-1/2"
      />
      <div className="m-auto w-full max-w-[350px] px-4 flex flex-col justify-center space-y-8 ">
        <h1 className="flex items-center gap-2 mx-auto md:text-xl font-semibold tracking-tight">
          <ShieldCheck size={26} />
          Вхід
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
