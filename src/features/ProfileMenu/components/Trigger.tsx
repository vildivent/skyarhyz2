import { useProfileMenuStore } from "../lib/store";

type TriggerProps = {
  userAvatar: React.ReactNode;
};
export default function Trigger({ userAvatar }: TriggerProps) {
  const { setIsOpen } = useProfileMenuStore();
  return (
    <button
      className="mx-3 flex h-12 items-center"
      onClick={() => setIsOpen(true)}
      onMouseEnter={() => setIsOpen(true)}
    >
      {userAvatar}
    </button>
  );
}
