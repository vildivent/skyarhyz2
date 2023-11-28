import { z } from "zod";

export const ZUserSubmit = z.object({
  name: z
    .string()
    .min(3, "Имя слишком короткое")
    .max(30, "Имя слишком длинное"),
  lastName: z
    .string()
    .min(3, "Фимилия слишком короткая")
    .max(30, "Фимилия слишком длинная")
    .nullable(),
  phone: z
    .string()
    .min(12, "Некорректный номер телефона")
    .max(12, "Некорректный номер телефона"),
});
export const ZUserSubmitForm = z.object({
  name: z
    .string()
    .min(3, "Имя слишком короткое")
    .max(30, "Имя слишком длинное"),
  lastName: z
    .string()
    .min(3, "Фимилия слишком короткая")
    .max(30, "Фимилия слишком длинная")
    .nullable(),
  phone: z
    .string()
    .min(18, "Некорректный номер телефона")
    .max(18, "Некорректный номер телефона"),
});
