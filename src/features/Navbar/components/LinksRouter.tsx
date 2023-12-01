"use client";
import { usePathname } from "next/navigation";

type LinksRouterProps = {
  links: React.ReactNode;
  linksDashboard: React.ReactNode;
  isAdmin: boolean;
};
export default function LinksRouter({
  links,
  linksDashboard,
  isAdmin,
}: LinksRouterProps) {
  const pathname = usePathname();
  if (isAdmin && pathname.includes("dashboard")) return linksDashboard;
  return links;
}
