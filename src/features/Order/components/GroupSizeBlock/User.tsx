"use client";
import { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";
import FieldView from "~/components/FieldView";
import { GroupSizeInput } from "~/shared/ui/inputs";
import FieldUpdate from "../FieldUpdate";

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
  const [error, setError] = useState("");
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setReset((prev) => !prev);
    setError("");
    setGroupSize(currentGroupSize);
  }, [editable, currentGroupSize]);

  return (
    <FieldView
      id={"groupSize-" + id}
      icon={<GoPerson size={size} />}
      tooltip="Размер группы"
      error={error}
    >
      <FieldUpdate
        type="user"
        data={{ id, groupSize }}
        defaultView={<DefaultView groupSize={groupSize} />}
        setError={setError}
        editable={editable}
        errorName="groupSize"
        reset={reset}
      >
        <GroupSizeInput
          name="groupSize"
          value={groupSize}
          onChange={(e) => {
            setError("");
            setGroupSize(+e.target.value);
          }}
        />
      </FieldUpdate>
    </FieldView>
  );
}

function DefaultView({ groupSize }: { groupSize: number }) {
  return <span className="ml-5">{groupSize.toString() + " чел."}</span>;
}
