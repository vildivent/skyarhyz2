"use client";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import MenuButton from "~/shared/ui/Menu/MenuButton";
import { useProfileMenuStore } from "../lib/store";

export default function LogoutButton() {
  const { setIsOpen } = useProfileMenuStore();
  return (
    <MenuButton
      title="Выход"
      onClick={() => {
        setIsOpen(false);
        void signOut({ callbackUrl: "/" });
      }}
      icon={<FiLogOut size={20} />}
    />
  );
}
