"use client";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import MenuButton from "~/shared/ui/Menu/MenuButton";

export default function LogoutButton() {
  return (
    <MenuButton
      title="Выход"
      onClick={() => void signOut({ callbackUrl: "/" })}
      icon={<FiLogOut size={20} />}
    />
  );
}
