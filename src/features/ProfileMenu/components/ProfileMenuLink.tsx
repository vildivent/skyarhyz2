"use client";
import MenuLink, { type MenuLinkProps } from "~/shared/ui/Menu/MenuLink";
import { useProfileMenuStore } from "../lib/store";

export default function ProfileMenuLink({
  ...props
}: Omit<MenuLinkProps, "onClick">) {
  const { setIsOpen } = useProfileMenuStore();
  return <MenuLink {...props} onClick={() => setIsOpen(false)} />;
}
