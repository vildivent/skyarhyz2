"use client";
import { useEffect, useState } from "react";
import { GoPeople } from "react-icons/go";
import FieldView from "~/components/FieldView";
import FieldUpdate from "../FieldUpdate";
import GroupSwitch from "./GroupSwitch";
import { useExcursionMenuStore } from "~/features/Excursion/lib/store";

type GroupSwitchBlockProps = {
  id: string;
  currentGroup?: number;
  totalGroups?: number;
};
export default function GroupSwitchBlockAdmin({
  id,
  currentGroup,
  totalGroups,
}: GroupSwitchBlockProps) {
  const size = 20;
  const [group, setGroup] = useState(currentGroup);
  const [error, setError] = useState("");
  const [reset, setReset] = useState(false);
  const editable = useExcursionMenuStore((state) => state.isOpen);

  useEffect(() => {
    setReset((prev) => !prev);
    setError("");
    setGroup(currentGroup);
  }, [editable, currentGroup]);

  return (
    <FieldView
      id={"admin-group-" + id}
      icon={<GoPeople size={size} />}
      tooltip="Группа"
      error={error}
    >
      <FieldUpdate
        type="admin"
        data={{ id, groupNumber: group }}
        defaultView={<DefaultView group={group} />}
        setError={setError}
        editable={editable}
        errorName="group"
        reset={reset}
      >
        <GroupSwitch
          currentGroup={group}
          setCurrentGroup={setGroup}
          totalGroups={totalGroups}
        />
      </FieldUpdate>
    </FieldView>
  );
}

function DefaultView({ group }: { group?: number }) {
  return (
    <span className="my-auto ml-5 overflow-hidden text-ellipsis">
      {group ? group : "-"}
    </span>
  );
}
