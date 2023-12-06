"use client";
import { useState, type ReactNode } from "react";
import Animation from "./Animation";
import TimestampBlock from "./TimestampBlock";
import TopMenu from "./TopMenu";

type ViewControllerProps = {
  visible: ReactNode;
  infoBlock: ReactNode;
  children: ReactNode;
  timestamp: Date;
};
export default function ViewController({
  visible,
  infoBlock,
  children,
  timestamp,
}: ViewControllerProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between">
        <TimestampBlock timestamp={timestamp} />
        <TopMenu isOpen={isOpen} setIsOpen={setIsOpen}></TopMenu>
      </div>
      {visible}
      {!isOpen && infoBlock}
      <Animation isOpen={isOpen}>{children}</Animation>
    </>
  );
}
