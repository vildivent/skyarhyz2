import { z } from "zod";
import { phoneNumberLengthFormatted } from "~/shared/constants";

const common = z.object({
  name: z
    .string()
    .min(3, "Имя слишком короткое")
    .max(30, "Имя слишком длинное"),
  phoneNumber: z
    .string()
    .min(phoneNumberLengthFormatted, "Некорректный номер телефона")
    .max(phoneNumberLengthFormatted, "Некорректный номер телефона"),
  groupSize: z
    .number({ invalid_type_error: "" })
    .min(1, "Введите размер группы")
    .max(99, "Максимальное количество человек - 99"),
  comment: z
    .string()
    .max(500, "Максимальное количество символов - 500")
    .optional(),
  referral: z.string().optional(),
  promocode: z.string().optional(),
});

export const ZOrderCreateForm = z
  .object({
    dateFrom: z.date({ invalid_type_error: "Выберите диапазон дат" }),
    dateTo: z.date({ invalid_type_error: "Выберите диапазон дат" }),
  })
  .merge(common);

const forInfer = z
  .object({
    dateFrom: z.date().nullable(),
    dateTo: z.date().nullable(),
  })
  .merge(common);

export type OrderCreateForm = z.infer<typeof forInfer>;
