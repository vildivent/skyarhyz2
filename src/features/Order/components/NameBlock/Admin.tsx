import Link from "next/link";
import { LiaUserCircle } from "react-icons/lia";
import IconWithTooltip from "~/components/IconWithTooltip";

type NameBlockProps = {
  id: string;
  name: string;
  userId?: string | null;
};
export default function NameBlockAdmin({ id, name, userId }: NameBlockProps) {
  const size = 25;
  return (
    <div className="my-auto flex h-10 items-center overflow-hidden text-ellipsis md:gap-2">
      <IconWithTooltip
        id={"admin-name-" + id}
        icon={<LiaUserCircle size={size} />}
        tooltip="Имя"
      />
      {userId ? (
        <Link
          className="my-auto ml-5 underline hover:text-primary"
          href={`/profile?id=${userId}`}
        >
          {name}
        </Link>
      ) : (
        <span className="ml-5 overflow-hidden text-ellipsis">{name}</span>
      )}
    </div>
  );
}
