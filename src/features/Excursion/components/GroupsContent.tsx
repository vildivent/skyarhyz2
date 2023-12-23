"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  GroupContent,
  ZeroGroupContent,
  type GroupData,
  type ZeroGroupData,
} from "./GroupContent";
import GroupView from "./GroupView";

type GroupsContentProps = {
  excursionGroups?: {
    zeroGroup: ZeroGroupData;
    restGroups: GroupData[];
  };
};
const GroupsContent = ({ excursionGroups }: GroupsContentProps) => {
  if (!excursionGroups) return null;
  const params = useSearchParams();
  const groupInit = Number(params.get("group"));
  const [currentGroup, setCurrentGroup] = useState(groupInit);
  return (
    <>
      <GroupView
        currentGroup={currentGroup}
        setCurrentGroup={setCurrentGroup}
        group={0}
      >
        <ZeroGroupContent group={excursionGroups.zeroGroup} />
      </GroupView>

      {excursionGroups.restGroups.map((group) => {
        return (
          <GroupView
            key={group.number}
            currentGroup={currentGroup}
            setCurrentGroup={setCurrentGroup}
            group={group.number}
          >
            <GroupContent group={group} />
          </GroupView>
        );
      })}
    </>
  );
};

export default GroupsContent;
