"use client";

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import ButtonAuth from "~/shared/ui/ButtonAuth";

export default function LogOutBtn() {
  return (
    <ButtonAuth
      text="Выход"
      icon={<FiLogOut size={30} />}
      onClick={() => void signOut()}
    />
  );
}
