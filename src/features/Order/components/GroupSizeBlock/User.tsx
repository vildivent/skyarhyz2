"use client";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";
import IconWithTooltip from "~/components/IconWithTooltip";
import FormError from "~/shared/ui/FormError";
import { GroupSizeInput } from "~/shared/ui/inputs";
import { api } from "~/trpc/react";
import Edit from "../Edit";

type GroupSizeBlockProps = {
  id: string;
  currentGroupSize: number;
  editable?: boolean;
};
export default function GroupSizeBlockUser({
  id,
  currentGroupSize,
  editable = false,
}: GroupSizeBlockProps) {
  const size = 20;
  const [groupSize, setGroupSize] = useState(currentGroupSize);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const { mutate: update, isLoading } = api.order.updateByUser.useMutation({
    onSuccess: async () => {
      setIsEditing(false);
    },
    onError: (error) => {
      const groupSizeError = error.data?.zodError?.fieldErrors.groupSize?.at(0);
      if (groupSizeError) return setError(groupSizeError);
      setError("Не удалось обновить!");
    },
  });

  const updateHandler = () => {
    update({ id, groupSize });
  };

  useEffect(() => {
    setIsEditing(false);
    setError("");
    setGroupSize(currentGroupSize);
  }, [editable, currentGroupSize]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <IconWithTooltip
          id={"groupSize-" + id}
          icon={<GoPerson size={size} />}
          tooltip="Размер группы"
        />
        <Edit
          defaultView={<DefaultView groupSize={groupSize} />}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          submit={updateHandler}
          isLoading={isLoading}
          editable={editable}
        >
          <EditView
            groupSize={groupSize}
            setGroupSize={setGroupSize}
            setError={setError}
          />
        </Edit>
      </div>
      <FormError error={error} iconMargin />
    </div>
  );
}

function DefaultView({ groupSize }: { groupSize: number }) {
  return <span className="ml-5">{groupSize.toString() + " чел."}</span>;
}

type EditViewProps = {
  groupSize: number;
  setGroupSize: Dispatch<SetStateAction<number>>;
  setError: Dispatch<SetStateAction<string>>;
};
function EditView({ groupSize, setGroupSize, setError }: EditViewProps) {
  return (
    <GroupSizeInput
      name="groupSize"
      value={groupSize}
      onChange={(e) => {
        setError("");
        setGroupSize(+e.target.value);
      }}
    />
  );
}
