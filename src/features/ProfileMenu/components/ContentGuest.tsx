import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import IconWithRedDot from "~/components/IconWithRedDot";
import MenuLink from "~/shared/ui/Menu/MenuLink";

export default function ContentGuest() {
  return (
    <>
      <MenuLink
        href="/registration"
        title="Завершить регистрацию"
        icon={<IconWithRedDot icon={<AiOutlineCheck size={20} />} />}
      />
      <div className="!text-red-500">
        <MenuLink
          href="/profile/delete"
          title="Удалить аккаунт"
          icon={<AiOutlineDelete size={20} />}
        />
      </div>
    </>
  );
}
