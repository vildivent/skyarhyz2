"use client";
import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  SetStateAction,
} from "react";
import { useEffect, useState } from "react";

type GroupSwitchProps = {
  currentGroup?: number;
  setCurrentGroup: Dispatch<SetStateAction<number | undefined>>;
  totalGroups?: number;
};
export default function GroupSwitch({
  currentGroup,
  setCurrentGroup,
  totalGroups,
}: GroupSwitchProps) {
  const [groupsArray, setGroupsArray] = useState<number[]>([]);

  useEffect(() => {
    if (!totalGroups) return;
    const newArray: number[] = [];
    for (let i = 0; i < totalGroups; i++) {
      newArray.push(i);
    }
    setGroupsArray(newArray);
  }, [totalGroups]);

  if (!totalGroups) return <></>;

  return (
    <div className="flex flex-wrap justify-center gap-5">
      {groupsArray.map((group) => (
        <GroupSwitchBtn
          key={group}
          onClick={() => setCurrentGroup(group)}
          disabled={group === currentGroup}
        >
          {group ? group : "-"}
        </GroupSwitchBtn>
      ))}
    </div>
  );
}

type GroupSwitchBtnProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
const GroupSwitchBtn = ({
  className,
  children,
  ...props
}: GroupSwitchBtnProps) => {
  return (
    <button
      className={
        "h-8 w-8 rounded-md border disabled:bg-lightgray" +
        (className ? " " + className : "")
      }
      {...props}
    >
      {children}
    </button>
  );
};
