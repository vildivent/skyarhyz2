"use client";
import { signIn } from "next-auth/react";
import { FiLogIn } from "react-icons/fi";

export default function LoginButton() {
  return (
    <button
      className="flex items-center gap-2 px-4 hover:bg-grayish hover:text-primary"
      onClick={() => signIn()}
    >
      <FiLogIn size={24} className="text-primary" />
      Войти
    </button>
  );
}
