import type { Dispatch, ReactNode, SetStateAction } from "react";

type TriggerProps = {
  userAvatar: ReactNode;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
};
export default function Trigger({ userAvatar, setMenuIsOpen }: TriggerProps) {
  return (
    <button
      className="mx-3 flex h-12 items-center"
      onClick={() => setMenuIsOpen(true)}
      onMouseEnter={() => setMenuIsOpen(true)}
    >
      {userAvatar}
    </button>
  );
}
