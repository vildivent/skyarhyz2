import { TRPCError } from "@trpc/server";
import type { Session } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export const adminCheck = async (callbackPath?: string) => {
  const session = await getServerAuthSession();
  if (!session)
    redirect(
      `/signin${
        callbackPath ? "?callbackUrl=" + encodeURIComponent(callbackPath) : ""
      }`,
    );
  if (session.user.role !== "admin" && session.user.role !== "root") notFound();
};

export const adminCheckAPI = (session: Session) => {
  if (session.user.role !== "admin" && session.user.role !== "root")
    throw new TRPCError({ code: "UNAUTHORIZED" });
};
