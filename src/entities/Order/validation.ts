import { ExcursionStatus, OrderStatus } from "@prisma/client";
import { z } from "zod";

export const orderStatus: z.ZodType<OrderStatus> = z.enum([
  OrderStatus.new,
  OrderStatus.registered,
  OrderStatus.active,
  OrderStatus.fulfilled,
  OrderStatus.cancelled,
]);

export const orderStatusExtended: z.ZodType<OrderStatus | ""> = z.enum([
  OrderStatus.new,
  OrderStatus.registered,
  OrderStatus.active,
  OrderStatus.fulfilled,
  OrderStatus.cancelled,
  "",
]);
export type OrderStatusExtended = z.infer<typeof orderStatusExtended>;

export const excursionStatus: z.ZodType<ExcursionStatus> = z.enum([
  ExcursionStatus.inqueue,
  ExcursionStatus.pending,
  ExcursionStatus.accepted,
  ExcursionStatus.cancelled,
]);

export const ZOrderDelete = z.object({ id: z.string().min(1) });

export const ZOrderCreate = z.object({
  name: z
    .string()
    .min(3, "Имя слишком короткое")
    .max(30, "Имя слишком длинное"),
  phoneNumber: z
    .string()
    .min(12, "Некорректный номер телефона")
    .max(12, "Некорректный номер телефона"),
  groupSize: z
    .number()
    .min(1, "Минимальное количество человек - 1")
    .max(99, "Максимальное количество человек - 99"),
  dateFrom: z.date(),
  dateTo: z.date(),
  comment: z
    .string()
    .max(500, "Максимальное количество символов - 500")
    .optional(),
  referral: z.string().optional(),
  promocode: z.string().optional(),
});

export const ZOrderUpdateByAdmin = z.object({
  id: z.string().min(1),
  groupSize: z.number().min(1).max(99).optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
  note: z.string().nullish(),
  status: orderStatus.optional(),
  groupNumber: z.number().min(0).max(7).optional(),
  excursionStatus: excursionStatus.nullish(),
});

export const ZOrderUpdateByUser = z.object({
  id: z.string().min(1),
  name: z
    .string()
    .min(3, "Имя слишком короткое")
    .max(30, "Имя слишком длинное")
    .optional(),
  phoneNumber: z
    .string()
    .min(12, "Некорректный номер телефона")
    .max(12, "Некорректный номер телефона")
    .optional(),
  groupSize: z
    .number()
    .min(1, "Минимальное количество человек - 1")
    .max(99, "Максимальное количество человек - 99")
    .optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
  comment: z
    .string()
    .max(300, "Максимальное количество символов - 300")
    .nullish(),
});

export const ZOrderGetById = z.object({
  id: z.string().min(1),
});

export const ZOrderGetByAdmin = z.object({
  q: z.string().optional(),
  status: orderStatus.optional(),
  groupSize: z
    .object({
      from: z.number().min(1).max(99).optional(),
      to: z.number().min(1).max(99).optional(),
    })
    .optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
  phoneNumber: z.string().min(12).max(12).optional(),
  groupNumber: z.number().min(0).max(7).optional(),
  sort: z.enum(["desc", "asc"]).optional(),
});
