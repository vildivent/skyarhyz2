import { LogoNavbar } from "~/shared/ui/Logo";
import { Links, LinksDashboard } from "./components/Links";
import LinksRouter from "./components/LinksRouter";
import Sidebar from "../Sidebar";
import ProfileMenu from "../ProfileMenu";
import { getServerAuthSession } from "~/server/auth";
import NotificationsNavbar from "../Notifications/components/NotificationsNavbar";

export default async function Navbar() {
  const session = await getServerAuthSession();
  const isAdmin =
    session?.user.role === "admin" || session?.user.role === "root";
  return (
    <nav className="sticky top-0 z-50 flex h-12 w-full border-b bg-darkgray text-center">
      <LogoNavbar />
      <LinksRouter
        links={<Links />}
        linksDashboard={<LinksDashboard />}
        isAdmin={isAdmin}
      />
      <div className="flex flex-1 justify-end gap-2">
        {session && <NotificationsNavbar />}
        <ProfileMenu />
        <Sidebar />
      </div>
    </nav>
  );
}
