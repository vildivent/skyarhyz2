import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  ZNotificationCreate,
  ZNotificationDelete,
  ZNotificationGetForUser,
  ZNotificationCheck,
} from "~/features/Notifications/lib/validation";
import { adminCheckAPI } from "~/shared/utils/adminCheck";

export const notificationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(ZNotificationCreate)
    .mutation(async ({ ctx, input }) => {
      adminCheckAPI(ctx.session);

      const forUser = await ctx.db.user.findUnique({
        where: { id: input.forUser },
      });
      if (!forUser) throw new TRPCError({ code: "BAD_REQUEST" });

      await ctx.db.notification.create({
        data: {
          text: input.text,
          forUser: { connect: { id: input.forUser } },
          type: input.type,
          order: input.orderId ? { connect: { id: input.orderId } } : {},
          excursion: input.excursionId
            ? { connect: { id: input.excursionId } }
            : {},
        },
      });
      // sendTelegramNotification(notification);
    }),

  get: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.notification.findMany({
      where: {
        forUserId: ctx.session.user.id,
        hidden: false,
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  getForUser: protectedProcedure
    .input(ZNotificationGetForUser)
    .query(async ({ ctx, input }) => {
      adminCheckAPI(ctx.session);

      return await ctx.db.notification.findMany({
        where: { forUserId: input.forUser },
        orderBy: { createdAt: "desc" },
      });
    }),

  getNewAmount: protectedProcedure.query(async ({ ctx }) => {
    const notifications = await ctx.db.notification.findMany({
      where: { forUserId: ctx.session.user.id, checked: null },
    });
    return notifications.length;
  }),

  check: protectedProcedure
    .input(ZNotificationCheck)
    .mutation(async ({ ctx, input }) => {
      const notification = await ctx.db.notification.findUnique({
        where: { id: input.id },
      });

      if (!notification) throw new TRPCError({ code: "NOT_FOUND" });

      if (ctx.session.user.id !== notification.forUserId)
        throw new TRPCError({ code: "BAD_REQUEST" });

      await ctx.db.notification.update({
        where: { id: input.id },
        data: { checked: new Date() },
      });
    }),

  checkAll: protectedProcedure.mutation(async ({ ctx }) => {
    return await ctx.db.notification.updateMany({
      where: { forUserId: ctx.session.user.id, checked: null },
      data: { checked: new Date() },
    });
  }),

  hideChecked: protectedProcedure.mutation(async ({ ctx }) => {
    return await ctx.db.notification.updateMany({
      where: {
        forUserId: ctx.session.user.id,
        checked: { not: null },
        hidden: false,
      },
      data: { hidden: true },
    });
  }),

  showChecked: protectedProcedure.mutation(async ({ ctx }) => {
    return await ctx.db.notification.updateMany({
      where: {
        forUserId: ctx.session.user.id,
        checked: { not: null },
        hidden: true,
      },
      data: { hidden: false },
    });
  }),

  deleteById: protectedProcedure
    .input(ZNotificationDelete)
    .mutation(async ({ ctx, input }) => {
      adminCheckAPI(ctx.session);

      const notification = await ctx.db.notification.findUnique({
        where: { id: input.id },
      });

      if (!notification) throw new TRPCError({ code: "NOT_FOUND" });

      await ctx.db.notification.delete({
        where: { id: input.id },
      });
    }),
});
