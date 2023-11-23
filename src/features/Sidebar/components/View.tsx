"use client";

import { useState } from "react";
import { ModalBlackscreen } from "~/components/Modal";
import IconButton from "~/shared/ui/IconButton";

export default function View({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <IconButton btntype="menu" onClick={() => setIsOpen((prev) => !prev)} />
      <ModalBlackscreen isOpen={isOpen} setIsOpen={setIsOpen}>
        <div
          className={`${
            isOpen ? "" : "translate-x-full"
          } absolute bottom-0 right-0 top-0 h-full max-w-[100vw] border bg-darkgray transition-all duration-500`}
        >
          <div className="flex items-center justify-end p-2">
            <IconButton btntype="close" onClick={() => setIsOpen(false)} />
          </div>
          {children}
        </div>
      </ModalBlackscreen>
    </>
  );
}
