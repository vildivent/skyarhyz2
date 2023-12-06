import { FaRegCommentDots } from "react-icons/fa";
import IconWithTooltip from "~/components/IconWithTooltip";

type CommentBlockProps = {
  id: string;
  comment: string | null;
};
export default function CommentBlockAdmin({ id, comment }: CommentBlockProps) {
  const size = 20;
  if (!comment) return null;
  return (
    <div className="flex items-start gap-2">
      <IconWithTooltip
        id={"admin-comment" + id}
        icon={<FaRegCommentDots size={size} />}
        tooltip="Комментарий"
      />
      <span className="my-auto ml-5 overflow-hidden text-ellipsis">
        {comment}
      </span>
    </div>
  );
}
