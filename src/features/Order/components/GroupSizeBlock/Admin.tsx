"use client";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";
import FormError from "~/shared/ui/FormError";
import { GroupSizeInput } from "~/shared/ui/inputs";
import { api } from "~/trpc/react";
import type { OrderGetByAdminInput } from "~/trpc/shared";
import Edit from "../Edit";
import IconWithTooltip from "~/components/IconWithTooltip";

type GroupSizeBlockProps = {
  id: string;
  currentGroupSize: number;
  query: OrderGetByAdminInput;
  editable?: boolean;
};
export default function GroupSizeBlockAdmin({
  id,
  currentGroupSize,
  query,
  editable = true,
}: GroupSizeBlockProps) {
  const size = 20;
  const [groupSize, setGroupSize] = useState(currentGroupSize);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const ctx = api.useUtils();
  const { mutate: update, isLoading } = api.order.updateByAdmin.useMutation({
    onSuccess: async () => {
      await ctx.order.getById.invalidate({ id });
      await ctx.order.getByAdmin.invalidate(query);
      //   await ctx.excursion.invalidate();
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
          id={"admin-groupSize-" + id}
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
