import { BsBookmark } from "react-icons/bs";
import IconWithTooltip from "~/components/IconWithTooltip";

type PromocodeBlockProps = {
  id: string;
  promocode?: string | null;
};
export default function PromocodeBlockUser({
  id,
  promocode,
}: PromocodeBlockProps) {
  if (!promocode) return null;
  const size = 20;
  return (
    <div className="flex items-center gap-2">
      <IconWithTooltip
        id={"promocode-" + id}
        icon={<BsBookmark size={size} />}
        tooltip="Промокод"
      />
      <span className="ml-5">{promocode}</span>
    </div>
  );
}
