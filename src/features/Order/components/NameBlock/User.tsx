"use client";
import { useEffect, useState } from "react";
import { LiaUserCircle } from "react-icons/lia";
import FieldView from "~/components/FieldView";
import { TextInput } from "~/shared/ui/inputs";
import { limitMask } from "~/shared/utils/inputMasks";
import FieldUpdate from "../FieldUpdate";

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
  const [error, setError] = useState("");
  const [name, setName] = useState(currentName);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setReset((prev) => !prev);
    setError("");
    setName(currentName);
  }, [editable, currentName]);

  return (
    <FieldView
      id={"name-" + id}
      icon={<LiaUserCircle size={size} />}
      tooltip="Имя"
      error={error}
    >
      <FieldUpdate
        type="user"
        data={{ id, name }}
        defaultView={<DefaultView name={name} />}
        setError={setError}
        editable={editable}
        errorName="name"
        reset={reset}
      >
        <TextInput
          placeholder="Имя"
          value={name}
          onChange={(e) => {
            setError("");
            setName(e.target.value);
          }}
          mask={(input) => limitMask(input, 30)}
        />
      </FieldUpdate>
    </FieldView>
  );
}

function DefaultView({ name }: { name: string }) {
  return <span className="ml-5 overflow-hidden text-ellipsis">{name}</span>;
}
