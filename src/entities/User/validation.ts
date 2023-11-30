import { z } from "zod";
import {
  phoneNumberLength,
  phoneNumberLengthFormatted,
} from "~/shared/constants";

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
    .min(phoneNumberLength, "Некорректный номер телефона")
    .max(phoneNumberLength, "Некорректный номер телефона"),
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
    .min(phoneNumberLengthFormatted, "Некорректный номер телефона")
    .max(phoneNumberLengthFormatted, "Некорректный номер телефона"),
});
