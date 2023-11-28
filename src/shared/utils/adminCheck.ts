import { TRPCError } from "@trpc/server";
import type { Session } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export const adminCheck = async () => {
  const session = await getServerAuthSession();
  if (!session) return redirect("/api/auth/signin");
  if (session.user.role !== "admin" && session.user.role !== "root")
    return notFound();
};

export const adminCheckAPI = (session: Session) => {
  if (session.user.role !== "admin" && session.user.role !== "root")
    throw new TRPCError({ code: "UNAUTHORIZED" });
};
