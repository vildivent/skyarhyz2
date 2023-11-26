import { HiOutlineUser } from "react-icons/hi2";
import { getServerAuthSession } from "~/server/auth";
import Line from "~/shared/ui/Line";
import MenuLink from "~/shared/ui/Menu/MenuLink";
import ContentAdmin from "./ContentAdmin";
import ContentGuest from "./ContentGuest";
import ContentUser from "./ContentUser";
import LogoutButton from "./LogoutButton";
import NotificationLink from "./NotificationLink";

export default async function Content() {
  const session = await getServerAuthSession();
  if (!session) return null;
  return (
    <>
      {session.user.role !== "guest" && (
        <>
          <MenuLink
            href="/profile"
            title="Профиль"
            icon={<HiOutlineUser size={24} />}
          />
          <NotificationLink />
          <Line className="px-5" />
        </>
      )}
      {session.user.role === "guest" && <ContentGuest />}
      {(session.user.role === "admin" || session.user.role === "root") && (
        <ContentAdmin />
      )}
      {session.user.role === "user" && <ContentUser />}
      <Line className="px-5" />
      <LogoutButton />
    </>
  );
}
