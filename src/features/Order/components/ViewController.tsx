"use client";
import { useState, type ReactNode } from "react";
import Animation from "./Animation";
import TopMenu from "./TopMenu";

type ViewControllerProps = {
  visible: ReactNode;
  infoBlock: ReactNode;
  children: ReactNode;
  top: ReactNode;
};
export default function ViewController({
  visible,
  infoBlock,
  children,
  top,
}: ViewControllerProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between">
        {top}
        <TopMenu isOpen={isOpen} setIsOpen={setIsOpen}></TopMenu>
      </div>
      {visible}
      {!isOpen && infoBlock}
      <Animation isOpen={isOpen}>{children}</Animation>
    </>
  );
}
