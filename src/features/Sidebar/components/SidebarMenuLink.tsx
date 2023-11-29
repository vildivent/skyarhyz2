"use client";
import MenuLink, { type MenuLinkProps } from "~/shared/ui/Menu/MenuLink";
import { useSidebarStore } from "../lib/store";

export default function SidebarMenuLink({
  ...props
}: Omit<MenuLinkProps, "onClick">) {
  const { setIsOpen } = useSidebarStore();
  return <MenuLink {...props} onClick={() => setIsOpen(false)} />;
}
