import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import LogOut from "~/features/Logout";

export default async function Signout() {
  const session = await getServerAuthSession();
  if (!session) redirect("/");
  return <LogOut username={session.user.name} />;
}
