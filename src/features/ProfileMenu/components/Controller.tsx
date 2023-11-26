"use client";

import { type ReactNode, useState } from "react";
import Trigger from "./Trigger";
import View from "./View";

type ControllerProps = {
  userAvatar: ReactNode;
  content: ReactNode;
};
export default function Controller({ userAvatar, content }: ControllerProps) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  return (
    <div onMouseLeave={() => setMenuIsOpen(false)}>
      <Trigger userAvatar={userAvatar} setMenuIsOpen={setMenuIsOpen} />
      <View content={content} menuIsOpen={menuIsOpen} />
    </div>
  );
}
