"use client";
import { useState } from "react";
import MenuGroup from "~/shared/ui/Menu/MenuGroup";
import { ActivitiesIcon, CollaborationIcon } from "~/shared/ui/icons";

type GroupsControllerProps = {
  activitiesGroup: React.ReactNode;
  collabGroup: React.ReactNode;
};
export default function GroupsController({
  activitiesGroup,
  collabGroup,
}: GroupsControllerProps) {
  const [openedId, setOpenedId] = useState("");
  return (
    <>
      <MenuGroup
        id="activities"
        title="Активности"
        icon={<ActivitiesIcon />}
        openedId={openedId}
        setOpenedId={setOpenedId}
      >
        {activitiesGroup}
      </MenuGroup>
      <MenuGroup
        id="collab"
        title="Сотрудничество"
        icon={<CollaborationIcon />}
        openedId={openedId}
        setOpenedId={setOpenedId}
      >
        {collabGroup}
      </MenuGroup>
    </>
  );
}
