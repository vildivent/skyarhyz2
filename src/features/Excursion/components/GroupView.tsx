"use client";
import type { Dispatch, SetStateAction } from "react";
import useSetSearchParams from "~/shared/utils/hooks/useSetSearchParams";

type GroupViewProps = {
  children: React.ReactNode;
  group: number;
  currentGroup: number;
  setCurrentGroup: Dispatch<SetStateAction<number>>;
};
export default function GroupView({
  children,
  group,
  currentGroup,
  setCurrentGroup,
}: GroupViewProps) {
  const routerReplace = useSetSearchParams();
  return (
    <button
      className={
        "flex-auto border-b border-r px-1 py-3 text-xs" +
        (group === currentGroup ? " bg-grayish" : " bg-darkgray")
      }
      onClick={() => {
        setCurrentGroup(group);
        routerReplace({ group: group.toString() });
      }}
    >
      {children}
    </button>
  );
}
