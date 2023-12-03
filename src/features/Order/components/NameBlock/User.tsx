"use client";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { LiaUserCircle } from "react-icons/lia";
import IconWithTooltip from "~/components/IconWithTooltip";
import FormError from "~/shared/ui/FormError";
import { TextInput } from "~/shared/ui/inputs";
import { limitMask } from "~/shared/utils/inputMasks";
import { api } from "~/trpc/react";
import Edit from "../Edit";

type NameBlockProps = {
  id: string;
  currentName: string;
  editable?: boolean;
};
export default function NameBlockUser({
  id,
  currentName,
  editable = false,
}: NameBlockProps) {
  const size = 25;
  const [name, setName] = useState(currentName);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const ctx = api.useUtils();
  const { mutate: update, isLoading } = api.order.updateByUser.useMutation({
    onSuccess: async () => {
      await ctx.order.getById.invalidate({ id });
      setIsEditing(false);
    },
    onError: (error) => {
      const nameError = error.data?.zodError?.fieldErrors.name?.at(0);
      if (nameError) return setError(nameError);
      setError("Не удалось обновить!");
    },
  });

  const submitHandler = () => {
    update({ id, name });
  };

  useEffect(() => {
    setIsEditing(false);
    setError("");
    setName(currentName);
  }, [editable, currentName]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <IconWithTooltip
          icon={<LiaUserCircle size={size} />}
          id={"name-" + id}
          tooltip="Имя"
        />
        <Edit
          defaultView={<DefaultView name={name} />}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          submit={submitHandler}
          editable={editable}
          isLoading={isLoading}
        >
          <EditView name={name} setName={setName} setError={setError} />
        </Edit>
      </div>
      <FormError error={error} iconMargin />
    </div>
  );
}

function DefaultView({ name }: { name: string }) {
  return <span className="ml-5 overflow-hidden text-ellipsis">{name}</span>;
}

type EditViewProps = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string>>;
};
function EditView({ name, setName, setError }: EditViewProps) {
  return (
    <TextInput
      placeholder="Имя"
      value={name}
      onChange={(e) => {
        setError("");
        setName(e.target.value);
      }}
      mask={(input) => limitMask(input, 30)}
    />
  );
}
