import { z } from "zod";

export const contactFormSchema = z.object({
  username: z.string().min(2, {
    message: "Ім'я користувача має містити принаймні 2 символи.",
  }),
  phone: z.string(),
  email: z.string().email({
    message: "Невірний формат email",
  }),
  message: z.string().min(2, {
    message: "Поле обов'зкове до заповнення",
  }),
});
