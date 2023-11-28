import { NotificationType } from "@prisma/client";
import { z } from "zod";

const BaseCreate = z.object({
  text: z.string().min(1),
  forUser: z.string().min(1),
  orderId: z.string().min(1).optional(),
});

export const ZNotificationCreate = z.discriminatedUnion("type", [
  z
    .object({
      type: z.literal(NotificationType.link),
      link: z.string(),
      excursionId: z.string().min(1).optional(),
    })
    .merge(BaseCreate),
  z
    .object({
      type: z.literal(NotificationType.confirmation),
      excursionId: z.string().min(1),
    })
    .merge(BaseCreate),

  z
    .object({
      type: z.literal(NotificationType.text),
      excursionId: z.string().min(1).optional(),
    })
    .merge(BaseCreate),
]);

export const ZNotificationDelete = z.object({ id: z.string().min(1) });
export const ZNotificationGetForUser = z.object({ forUser: z.string().min(1) });
export const ZNotificationCheck = z.object({ id: z.string().min(1) });
