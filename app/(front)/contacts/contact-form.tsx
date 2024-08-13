"use client";

import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { ClipboardType, Loader } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Inputs {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export const ContactForm = () => {
  const [inputs, setInputs] = useState<Inputs>(() => {
    const storedData = localStorage.getItem("contactFormInputs");
    return storedData
      ? JSON.parse(storedData)
      : { name: "", email: "", phoneNumber: "", message: "" };
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("contactFormInputs", JSON.stringify(inputs));
  }, [inputs]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, phoneNumber, message } = inputs;

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Поля не повинні бути порожніми");
      return;
    }

    toast.success("Інформація успішно відправлена! Дякуємо.");

    setInputs({
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="flex items-center gap-3 font-semibold py-4 uppercase mx-auto">
        <ClipboardType />
        Форма зв&apos;язку
      </h2>
      <form className="flex flex-col gap-2 w-full" onSubmit={handleFormSubmit}>
        <Label className="flex flex-col gap-2">
          Ім&apos;я
          <Input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </Label>

        <Label className="flex flex-col gap-2">
          Номер телефону
          <Input
            type="text"
            name="phoneNumber"
            value={inputs.phoneNumber}
            onChange={handleChange}
          />
        </Label>

        <Label className="flex flex-col gap-2">
          Email
          <Input
            type="text"
            name="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </Label>

        <Label className="flex flex-col gap-2">
          Повідомлення:
          <Textarea
            name="message"
            value={inputs.message}
            onChange={handleChange}
            placeholder="Залиште свій коментар..."
          />
        </Label>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="max-w-xs w-full mx-auto md:mt-10"
        >
          {isSubmitting && <Loader className="animate-spin" />}
          Надіслати
        </Button>
      </form>
    </div>
  );
};
