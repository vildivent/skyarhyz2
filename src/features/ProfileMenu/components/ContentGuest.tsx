"use client";
import { usePathname } from "next/navigation";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import IconWithRedDot from "~/components/IconWithRedDot";
import ProfileMenuLink from "./ProfileMenuLink";

export default function ContentGuest() {
  const pathname = usePathname();
  return (
    <>
      <ProfileMenuLink
        href={`/registration?callbackUrl=${encodeURI(pathname)}`}
        title="Завершить регистрацию"
        icon={<IconWithRedDot icon={<AiOutlineCheck size={20} />} />}
      />
      <ProfileMenuLink
        href="/profile"
        title="Удалить аккаунт"
        icon={<AiOutlineDelete size={20} />}
      />
    </>
  );
}
