"use client";
import { usePathname } from "next/navigation";

type LinksRouterProps = {
  links: React.ReactNode;
  linksDashboard: React.ReactNode;
};
export default function LinksRouter({
  links,
  linksDashboard,
}: LinksRouterProps) {
  const pathname = usePathname();
  if (pathname.includes("dashboard")) return linksDashboard;
  return links;
}
