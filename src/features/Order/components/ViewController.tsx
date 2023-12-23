"use client";
import type { ExcursionStatus } from "@prisma/client";
import { useRef, useState, type ReactNode } from "react";
import { useExcursionMenuStore } from "~/features/Excursion/lib/store";
import Container from "~/shared/ui/Container";
import { getBorderColor } from "../lib/helpers";
import Animation from "./Animation";
import TopMenu from "./TopMenu";

type ViewControllerProps = {
  visible: ReactNode;
  infoBlock: ReactNode;
  children: ReactNode;
  top: ReactNode;
  excursionStatus?: ExcursionStatus | null;
};
export default function ViewController({
  visible,
  infoBlock,
  children,
  top,
  excursionStatus,
}: ViewControllerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const element = useRef<HTMLDivElement>(null);
  const border = getBorderColor(excursionStatus ?? null);
  const excursionMode = useExcursionMenuStore((state) => state.isOpen);
  return (
    <Container style={{ borderColor: excursionMode ? border : undefined }}>
      <div ref={element} className="flex items-center justify-between">
        {top}
        <TopMenu isOpen={isOpen} setIsOpen={setIsOpen}></TopMenu>
      </div>
      {visible}
      <Animation element={element} isOpen={isOpen} infoBlock={infoBlock}>
        {children}
      </Animation>
    </Container>
  );
}
