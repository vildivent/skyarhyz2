"use client";
import { useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import FieldView from "~/components/FieldView";
import { TextAreaInput } from "~/shared/ui/inputs";
import { limitMask } from "~/shared/utils/inputMasks";
import FieldUpdate from "../FieldUpdate";

type CommentBlockProps = {
  id: string;
  currentComment: string | null;
  editable?: boolean;
};
export default function CommentBlockUser({
  id,
  currentComment,
  editable = true,
}: CommentBlockProps) {
  const size = 20;
  const [error, setError] = useState("");
  const [reset, setReset] = useState(false);
  const [comment, setComment] = useState(currentComment);

  useEffect(() => {
    setReset((prev) => !prev);
    setError("");
    setComment(currentComment);
  }, [editable, currentComment]);

  return (
    <FieldView
      id={"comment-" + id}
      icon={<FaRegCommentDots size={size} />}
      tooltip="Комментарий"
      error={error}
      itemsStart
    >
      <FieldUpdate
        type="user"
        data={{ id, comment }}
        defaultView={<DefaultView comment={comment} />}
        setError={setError}
        editable={editable}
        errorName="comment"
        reset={reset}
      >
        <TextAreaInput
          name="comment"
          value={comment ?? ""}
          onChange={(e) => {
            setError("");
            setComment(e.target.value);
          }}
          mask={(input) => limitMask(input, 300)}
        />
      </FieldUpdate>
    </FieldView>
  );
}

function DefaultView({ comment }: { comment: string | null }) {
  return (
    <span className="my-auto ml-5 overflow-hidden text-ellipsis">
      {comment}
    </span>
  );
}
