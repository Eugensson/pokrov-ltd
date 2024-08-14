"use client";

import {
  AtSign,
  ClipboardType,
  PhoneCall,
  Send,
  UserRound,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { contactFormSchema } from "@/lib/schemas";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

export const ContactForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      username: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    const response = await fetch("/api/feedback-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    });

    const { success, error } = await response.json();

    if (success) {
      toast({
        title: "Дякуємо! Повідомлення відправлено.",
        description: "Менеджер найближчим часом звяжеться з Вами.",
      });

      form.reset();

      form.clearErrors();
    } else if (error) {
      toast({
        variant: "destructive",
        title: "Сталася помилка.",
        description: "Будь ласка, спробуйте пізніше.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="flex items-center gap-3 font-semibold py-2 uppercase mx-auto">
        <ClipboardType />
        Форма зв&apos;язку
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 md:space-y-5 w-full flex flex-col justify-center"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Ведіть Ваше і'мя"
                      {...field}
                      className="pl-10"
                    />
                    <UserRound className="absolute top-1/2 left-2 -translate-y-1/2 text-slate-500" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <PatternFormat
                      format="+38 (###) ### ## ##"
                      allowEmptyFormatting
                      mask="_"
                      value={field.value}
                      onValueChange={(values) => {
                        field.onChange(values.value);
                      }}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-10 text-slate-500 font-semibold"
                    />

                    <PhoneCall className="absolute top-1/2 left-2 -translate-y-1/2 text-slate-500" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="pl-10"
                      placeholder="Ведіть Ваш email"
                      {...field}
                    />
                    <AtSign className="absolute top-1/2 left-2 -translate-y-1/2 text-slate-500" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Введіть текст повідомлення"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="dark:bg-gray-500 dark:hover:bg-gray-400 dark:text-white w-[200px] mx-auto flex items-center gap-2"
          >
            Надіслати
            <Send />
          </Button>
        </form>
      </Form>
    </div>
  );
};
