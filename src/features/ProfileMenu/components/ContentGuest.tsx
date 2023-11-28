"use client";
import { usePathname } from "next/navigation";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import IconWithRedDot from "~/components/IconWithRedDot";
import MenuLink from "~/shared/ui/Menu/MenuLink";

export default function ContentGuest() {
  const pathname = usePathname();
  return (
    <>
      <MenuLink
        href={`/registration?callbackUrl=${encodeURI(pathname)}`}
        title="Завершить регистрацию"
        icon={<IconWithRedDot icon={<AiOutlineCheck size={20} />} />}
      />
      <MenuLink
        href="/profile"
        title="Удалить аккаунт"
        icon={<AiOutlineDelete size={20} />}
      />
    </>
  );
}
