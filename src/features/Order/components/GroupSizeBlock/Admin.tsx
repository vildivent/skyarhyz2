"use client";
import { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";
import { GroupSizeInput } from "~/shared/ui/inputs";
import { api } from "~/trpc/react";
import FieldUpdate from "../FieldUpdate";
import FieldView from "../FieldView";

type GroupSizeBlockProps = {
  id: string;
  currentGroupSize: number;
  editable?: boolean;
};
export default function GroupSizeBlockAdmin({
  id,
  currentGroupSize,
  editable = true,
}: GroupSizeBlockProps) {
  const size = 20;
  const [groupSize, setGroupSize] = useState(currentGroupSize);
  const [error, setError] = useState("");
  const [reset, setReset] = useState(false);
  const ctx = api.useUtils();
  const query = {};

  useEffect(() => {
    setReset((prev) => !prev);
    setError("");
    setGroupSize(currentGroupSize);
  }, [editable, currentGroupSize]);

  async function onSuccess() {
    await ctx.order.getByAdmin.invalidate(query);
    //   await ctx.excursion.invalidate();
  }

  return (
    <FieldView
      id={"admin-groupSize-" + id}
      icon={<GoPerson size={size} />}
      tooltip="Размер группы"
      error={error}
    >
      <FieldUpdate
        type="admin"
        data={{ id, groupSize }}
        defaultView={<DefaultView groupSize={groupSize} />}
        setError={setError}
        editable={editable}
        errorName="groupSize"
        reset={reset}
        onSuccess={onSuccess}
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
