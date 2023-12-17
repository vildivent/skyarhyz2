import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  ZGetExcursionDate,
  ZExcursionClose,
  ZExcursionCreate,
  ZExcursionUpdate,
} from "~/features/Excursion/lib/validation";
import { dateClearTime } from "~/shared/utils/formatDate";
import { adminCheckAPI } from "~/shared/utils/adminCheck";
import type {
  GroupData,
  ZeroGroupData,
} from "~/features/Excursion/components/GroupContent";

export const excursionRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    adminCheckAPI(ctx.session);

    const excursionCurrent = await ctx.db.excursion.findFirst({
      where: { current: true },
      include: { excursionGroups: { orderBy: { number: "asc" } } },
    });
    if (!excursionCurrent) return null;

    const zeroGroup = excursionCurrent?.excursionGroups?.find(
      (group) => group.number === 0,
    );
    if (!zeroGroup)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Excursion groups not found",
      });

    //Убираем дубликаты активных экскурсий
    await ctx.db.excursion.deleteMany({
      where: { id: { not: excursionCurrent.id }, current: true },
    });
    //Подцепляем подходящие заявки
    const today = dateClearTime(new Date());
    await ctx.db.order.updateMany({
      where: {
        AND: [
          { OR: [{ status: "registered" }, { status: "active" }] },
          { OR: [{ excursionId: null }, { excursionGroupId: null }] },
        ],
        dateFrom: { lte: today },
        dateTo: { gte: today },
      },
      data: {
        status: "active",
        excursionId: excursionCurrent.id,
        excursionGroupId: zeroGroup.id,
        excursionStatus: "inqueue",
      },
    });

    //Селектим необходимые первичные данные
    const excursion = await ctx.db.excursion.findFirst({
      where: { current: true },
      select: {
        id: true,
        createdAt: true,
        createdBy: {
          select: { id: true, name: true, lastName: true, image: true },
        },
        excursionGroups: {
          orderBy: { number: "asc" },
          select: {
            id: true,
            number: true,
            time: true,
            Order: {
              select: {
                groupSize: true,
                excursionStatus: true,
              },
            },
          },
        },
      },
    });
    if (!excursion?.excursionGroups)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Excursion groups not found",
      });

    const zeroGroupData: ZeroGroupData = {
      ordersInGroup: 0,
      ordersTotal: 0,
      peopleInGroup: 0,
      peopleTotal: 0,
    };
    const groupData: GroupData[] = [];

    //Считаем вторичные данные из первичных для каждой группы
    for (const group of excursion.excursionGroups) {
      if (group.number === 0) {
        zeroGroupData.ordersInGroup = group.Order.length;
        zeroGroupData.peopleInGroup = group.Order.reduce(
          (previous, current) => previous + current.groupSize,
          0,
        );
        zeroGroupData.ordersTotal += zeroGroupData.ordersInGroup;
        zeroGroupData.peopleTotal += zeroGroupData.peopleInGroup;

        //для статистики
        await ctx.db.excursionGroup.update({
          where: { id: group.id },
          data: {
            people: zeroGroupData.peopleInGroup,
            orders: zeroGroupData.ordersInGroup,
          },
        });
        break;
      }

      const ordersInGroup = group.Order.length;
      const peopleInGroup = group.Order.reduce(
        (previous, current) => previous + current.groupSize,
        0,
      );

      zeroGroupData.ordersTotal += ordersInGroup;
      zeroGroupData.peopleTotal += peopleInGroup;

      groupData.push({
        number: group.number,
        time: group.time,
        ordersInGroup,
        peopleInGroup,
        ordersConfirmed: group.Order.reduce(
          (previous, current) =>
            previous + +(current.excursionStatus === "accepted"),
          0,
        ),
        peopleConfirmed: group.Order.reduce(
          (previous, current) =>
            previous +
            (current.excursionStatus === "accepted" ? current.groupSize : 0),
          0,
        ),
      });

      //для статистики
      await ctx.db.excursionGroup.update({
        where: { id: group.id },
        data: {
          people: peopleInGroup,
          orders: ordersInGroup,
        },
      });
    }

    return {
      ...excursion,
      excursionGroups: { zeroGroup: zeroGroupData, restGroups: groupData },
    };
  }),

  create: protectedProcedure
    .input(ZExcursionCreate)
    .mutation(async ({ ctx, input }) => {
      adminCheckAPI(ctx.session);

      const currentExcursion = await ctx.db.excursion.findFirst({
        where: { current: true },
        include: { excursionGroups: { orderBy: { number: "asc" } } },
      });

      if (currentExcursion) return;

      const data: { number: number; time?: Date }[] = [];
      data.push({ number: 0 });

      for (let i = 0; i < input.groups; i++) {
        data.push({ number: i + 1, time: input.times[i] });
      }

      await ctx.db.excursion.create({
        data: {
          createdBy: { connect: { id: ctx.session.user.id } },
          excursionGroups: { createMany: { data } },
        },
      });
    }),

  update: protectedProcedure
    .input(ZExcursionUpdate)
    .mutation(async ({ ctx, input }) => {
      adminCheckAPI(ctx.session);

      const currentExcursion = await ctx.db.excursion.findFirst({
        where: { id: input.id },
        include: { excursionGroups: { orderBy: { number: "asc" } } },
      });

      if (!currentExcursion) throw new TRPCError({ code: "NOT_FOUND" });

      for (let i = 0; i < input.groups; i++) {
        //Обновляем существующие
        if (
          i < currentExcursion.excursionGroups.length - 1 &&
          i < input.times.length
        ) {
          await ctx.db.excursionGroup.update({
            where: {
              number_excursionId: { number: i + 1, excursionId: input.id },
            },
            data: { time: input.times[i] },
          });
        }
        //Создаём новые
        if (i >= currentExcursion.excursionGroups.length - 1) {
          await ctx.db.excursionGroup.create({
            data: {
              excursion: { connect: { id: input.id } },
              number: i + 1,
              time: input.times[i] ?? null,
            },
          });
        }
      }
      //Удаляем лишние
      if (input.times.length < currentExcursion.excursionGroups.length - 1) {
        await ctx.db.excursionGroup.deleteMany({
          where: {
            excursionId: input.id,
            number: { gt: input.times.length },
          },
        });
      }
    }),

  close: protectedProcedure
    .input(ZExcursionClose)
    .mutation(async ({ ctx, input }) => {
      adminCheckAPI(ctx.session);

      const excursion = await ctx.db.excursion.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          orders: {
            select: {
              id: true,
              excursionGroup: { select: { number: true } },
              excursionStatus: true,
            },
          },
        },
      });

      if (!excursion) throw new TRPCError({ code: "NOT_FOUND" });

      await ctx.db.order.updateMany({
        where: { excursionId: input.id, excursionGroup: { number: 0 } },
        data: {
          excursionId: null,
          excursionGroupId: null,
          status: "registered",
        },
      });

      const orders = await ctx.db.order.findMany({
        where: {
          excursionId: input.id,
          excursionGroup: { number: { not: 0 } },
        },
        select: { userId: true },
      });
      const filteredOrders = orders.filter((order) => order.userId !== null);
      const data = filteredOrders.map((order) => ({
        userId: order.userId ?? "",
        text: "Спасибо, что посетили экскурсию. Оставьте отзыв.",
      }));

      await ctx.db.notification.createMany({ data });
      //telegram

      await ctx.db.order.updateMany({
        where: {
          excursionId: input.id,
          excursionGroup: { number: { not: 0 } },
        },
        data: { status: "fulfilled" },
      });

      await ctx.db.excursion.update({
        where: { id: input.id },
        data: { current: false },
      });
    }),

  getExcursionDate: protectedProcedure
    .input(ZGetExcursionDate)
    .query(async ({ ctx, input }) => {
      if (!input.groupNumber || !input.id) return null;

      const group = await ctx.db.excursionGroup.findUnique({
        where: {
          number_excursionId: {
            number: input.groupNumber,
            excursionId: input.id,
          },
        },
      });
      if (!group) return null;

      return group.time;
    }),
});
