import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function authCheck(callbackPath?: string) {
  const session = await getServerAuthSession();
  if (!session)
    redirect(
      `/signin${
        callbackPath ? "?callbackUrl=" + encodeURIComponent(callbackPath) : ""
      }`,
    );
  if (session.user.role === "guest") redirect("/registration");
}
