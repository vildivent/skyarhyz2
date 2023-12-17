"use client";
import { useState, type ReactNode, useRef } from "react";
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
  const element = useRef<HTMLDivElement>(null);
  return (
    <>
      <div ref={element} className="flex items-center justify-between">
        {top}
        <TopMenu isOpen={isOpen} setIsOpen={setIsOpen}></TopMenu>
      </div>
      {visible}
      <Animation element={element} isOpen={isOpen} infoBlock={infoBlock}>
        {children}
      </Animation>
    </>
  );
}
