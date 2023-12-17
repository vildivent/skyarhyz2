"use client";
import { useSearchParams } from "next/navigation";
import useSetSearchParams from "~/shared/utils/hooks/useSetSearchParams";

type GroupViewProps = {
  children: React.ReactNode;
  group: number;
};
export default function GroupView({ children, group }: GroupViewProps) {
  const routerReplace = useSetSearchParams();
  const params = useSearchParams();
  const currentGroup = params.get("group");
  return (
    <button
      className={
        "flex-auto border-b border-r px-1 py-3 text-xs" +
        (group.toString() === currentGroup ? " bg-grayish" : " bg-darkgray")
      }
      onClick={() => routerReplace({ group: group.toString() })}
    >
      {children}
    </button>
  );
}
