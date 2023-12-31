import { createTRPCRouter } from "~/server/api/trpc";
import { notificationRouter } from "./routers/notification";
import { userRouter } from "./routers/user";
import { orderRouter } from "./routers/order";
import { excursionRouter } from "./routers/excursion";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  order: orderRouter,
  notification: notificationRouter,
  excursion: excursionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
