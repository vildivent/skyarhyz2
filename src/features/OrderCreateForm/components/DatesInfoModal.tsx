"use client";
import { useState, type ReactNode } from "react";
import { ModalContainer } from "~/components/Modal";
import IconButton from "~/shared/ui/IconButton";

type DatesInfoModalProps = {
  datesInfo: ReactNode;
};
export default function DatesInfoModal({ datesInfo }: DatesInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <IconButton
        className="-my-1"
        btntype="info"
        onClick={() => setIsOpen(true)}
      />
      <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen}>
        {datesInfo}
      </ModalContainer>
    </>
  );
}
