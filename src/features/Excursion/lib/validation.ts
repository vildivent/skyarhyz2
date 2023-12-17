import { z } from "zod";

export const ZExcursionCreate = z.object({
  groups: z.number().min(1).max(7),
  times: z.array(z.date()).min(1).max(7),
});

export const ZExcursionUpdate = z.object({
  id: z.string().min(1),
  groups: z.number().min(1).max(7),
  times: z.array(z.date()).min(1).max(7),
});

export const ZExcursionClose = z.object({ id: z.string().min(1) });

export const ZGetExcursionDate = z.object({
  id: z.string().min(1).nullable(),
  groupNumber: z.number().min(0).max(7).nullable(),
});
