import { TRPCError } from "@trpc/server";
import notificationMessages from "~/entities/Notification/messages";
import {
  ZOrderCreate,
  ZOrderDelete,
  ZOrderGetByAdmin,
  ZOrderGetById,
  ZOrderUpdateByAdmin,
  ZOrderUpdateByUser,
} from "~/features/Order/lib/validation";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { adminCheckAPI } from "~/shared/utils/adminCheck";

export const orderRouter = createTRPCRouter({
  create: protectedProcedure
    .input(ZOrderCreate)
    .mutation(async ({ ctx, input }) => {
      let referral = null;
      if (input.referral)
        referral = await ctx.db.partner.findUnique({
          where: { referralId: input.referral },
        });

      let promocode = null;
      if (input.promocode) {
        promocode = await ctx.db.promocode.findUnique({
          where: { code: input.promocode },
        });
        if (!promocode?.valid)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "invalid promocode",
          });
      }

      const order = await ctx.db.order.create({
        data: {
          name: input.name,
          phoneNumber: input.phoneNumber,
          groupSize: input.groupSize,
          dateFrom: input.dateFrom,
          dateTo: input.dateTo,
          comment: input.comment,
          createdById: ctx.session.user.id,
          promocodeId: promocode?.id,
          partnerId: referral?.id,
        },
      });

      await ctx.db.notification.create({
        data: {
          text: notificationMessages.userOrderCreate,
          forUserId: ctx.session.user.id,
          orderId: order.id,
        },
      });
      //send telegram notification

      const admins = await ctx.db.user.findMany({
        where: { role: "admin" },
      });
      const data = admins.map((admin) => ({
        text: notificationMessages.adminOrderCreate,
        forUserId: admin.id,
        orderId: order.id,
      }));

      await ctx.db.notification.createMany({ data });

      //send telegram notifications
    }),

  createNoAuth: publicProcedure
    .input(ZOrderCreate)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.order.create({
        data: {
          name: input.name,
          phoneNumber: input.phoneNumber,
          groupSize: input.groupSize,
          dateFrom: input.dateFrom,
          dateTo: input.dateTo,
          comment: input.comment,
        },
      });
    }),

  updateByAdmin: protectedProcedure
    .input(ZOrderUpdateByAdmin)
    .mutation(async ({ ctx, input }) => {
      adminCheckAPI(ctx.session);

      await ctx.db.order.update({
        where: { id: input.id },
        data: {
          groupSize: input.groupSize,
          dateFrom: input.dateFrom ?? undefined,
          dateTo: input.dateTo ?? undefined,
          note: input.note,
          status: input.status,
          excursionStatus: input.excursionStatus,
        },
      });

      if (input.groupNumber !== undefined) {
        const excursion = await ctx.db.excursion.findFirst({
          where: { current: true },
          include: {
            excursionGroups: { where: { number: input.groupNumber } },
          },
        });
        if (!excursion) throw new TRPCError({ code: "BAD_REQUEST" });

        await ctx.db.order.update({
          where: { id: input.id },
          data: {
            excursionGroupId: excursion.excursionGroups[0]?.id,
          },
        });
      }
    }),

  updateByUser: protectedProcedure
    .input(ZOrderUpdateByUser)
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.db.order.findUnique({
        where: { id: input.id },
      });

      if (!order) throw new TRPCError({ code: "BAD_REQUEST" });

      if (ctx.session.user.id !== order.createdById)
        throw new TRPCError({ code: "UNAUTHORIZED" });

      await ctx.db.order.update({
        where: { id: input.id },
        data: {
          name: input.name,
          phoneNumber: input.phoneNumber,
        },
      });

      if (order.status !== "new" && order.status !== "registered")
        throw new TRPCError({ code: "BAD_REQUEST" });

      await ctx.db.order.update({
        where: { id: input.id },
        data: {
          groupSize: input.groupSize,
          dateFrom: input.dateFrom ?? undefined,
          dateTo: input.dateTo ?? undefined,
          comment: input.comment,
        },
      });
    }),

  deleteByAdmin: protectedProcedure
    .input(ZOrderDelete)
    .mutation(async ({ ctx, input }) => {
      adminCheckAPI(ctx.session);

      await ctx.db.order.delete({
        where: { id: input.id },
      });
    }),

  deleteByUser: protectedProcedure
    .input(ZOrderDelete)
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.db.order.findUnique({
        where: { id: input.id },
      });

      if (!order) throw new TRPCError({ code: "BAD_REQUEST" });

      if (ctx.session.user.id !== order.createdById)
        throw new TRPCError({ code: "UNAUTHORIZED" });

      return await ctx.db.order.delete({
        where: { id: input.id },
      });
    }),

  getById: protectedProcedure
    .input(ZOrderGetById)
    .query(async ({ ctx, input }) => {
      const order = await ctx.db.order.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          createdAt: true,
          name: true,
          phoneNumber: true,
          groupSize: true,
          dateFrom: true,
          dateTo: true,
          status: true,
          comment: true,
          promocode: { select: { code: true } },
          excursionGroup: { select: { time: true } },
          createdById: true,
        },
      });

      if (!order) throw new TRPCError({ code: "BAD_REQUEST" });

      if (order.createdById !== ctx.session.user.id) adminCheckAPI(ctx.session);

      return order;
    }),

  getByAdmin: protectedProcedure
    .input(ZOrderGetByAdmin)
    .query(async ({ ctx, input }) => {
      adminCheckAPI(ctx.session);

      const excursion = await ctx.db.excursion.findFirst({
        where: { current: true },
      });

      const orders = await ctx.db.order.findMany({
        where: {
          OR: [
            { name: { contains: input.q ?? "", mode: "insensitive" } },
            { comment: { contains: input.q ?? "", mode: "insensitive" } },
            { note: { contains: input.q ?? "", mode: "insensitive" } },
            { phoneNumber: { contains: input.q ?? "", mode: "insensitive" } },
          ],
          groupSize: {
            gte: input.groupSize?.from,
            lte: input.groupSize?.to,
          },
          dateFrom: { lte: input.dateTo },
          dateTo: { gte: input.dateFrom },
          phoneNumber: input.phoneNumber,
          status: input.status ?? {},
          excursionGroup: { number: input.groupNumber },
        },
        orderBy: { createdAt: input.sort ?? "desc" },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              phone: true,
              orders: { select: { id: true } },
              partnership: { select: { referralId: true, name: true } },
            },
          },
          excursionGroup: { select: { number: true, time: true } },
          excursion: {
            select: { excursionGroups: { select: { number: true } } },
          },
          notifications: {
            where: { excursionId: excursion?.id ?? null, type: "confirmation" },
            select: {
              createdAt: true,
              firstLoad: true,
              checked: true,
              confirmed: true,
            },
            orderBy: { createdAt: "desc" },
          },
          partner: {
            select: {
              referralId: true,
              name: true,
            },
          },
          promocode: {
            select: {
              code: true,
              type: true,
            },
          },
        },
      });

      return orders;
    }),

  getByUser: protectedProcedure.query(async ({ ctx }) => {
    const orders = await ctx.db.order.findMany({
      where: {
        createdById: ctx.session.user.id,
      },
      select: {
        id: true,
        createdAt: true,
        name: true,
        phoneNumber: true,
        groupSize: true,
        dateFrom: true,
        dateTo: true,
        status: true,
        comment: true,
        promocode: { select: { code: true } },
        excursionGroup: { select: { time: true } },
        createdById: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return orders;
  }),
});
