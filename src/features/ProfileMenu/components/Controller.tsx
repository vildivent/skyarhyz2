"use client";
import { useProfileMenuStore } from "../lib/store";
import Trigger from "./Trigger";
import View from "./View";

type ControllerProps = {
  userAvatar: React.ReactNode;
  content: React.ReactNode;
};
export default function Controller({ userAvatar, content }: ControllerProps) {
  const { setIsOpen } = useProfileMenuStore();
  return (
    <div onMouseLeave={() => setIsOpen(false)}>
      <Trigger userAvatar={userAvatar} />
      <View content={content} />
    </div>
  );
}
