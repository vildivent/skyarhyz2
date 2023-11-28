import { ZUserSubmit } from "~/entities/User/validation";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  registration: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        name: true,
        lastName: true,
        phone: true,
        notificationId: true,
        telegramEnabled: true,
        whatsappEnabled: true,
      },
    });
  }),
  submit: protectedProcedure
    .input(ZUserSubmit)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          name: input.name,
          lastName: input.lastName,
          phone: input.phone,
          registered: new Date(),
          role: "user",
        },
      });
    }),
  delete: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.user.delete({
      where: { id: ctx.session.user.id },
    });
  }),
  forOrder: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: { name: true, phone: true },
    });
  }),
});
