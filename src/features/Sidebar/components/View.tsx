"use client";
import { ModalBlackscreen } from "~/components/Modal";
import IconButton from "~/shared/ui/IconButton";
import { useSidebarStore } from "../lib/store";

export default function View({ children }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen } = useSidebarStore();
  return (
    <>
      <IconButton btntype="menu" onClick={() => setIsOpen(!isOpen)} />
      <ModalBlackscreen isOpen={isOpen} setIsOpen={setIsOpen}>
        <div
          className={`${
            isOpen ? "" : "translate-x-full"
          } absolute bottom-0 right-0 top-0 h-full max-w-[100vw] overflow-y-auto border bg-darkgray transition-all duration-300`}
        >
          <div className="sticky top-0 z-10 flex items-center justify-end bg-darkgray p-2">
            <IconButton btntype="close" onClick={() => setIsOpen(false)} />
          </div>
          {children}
        </div>
      </ModalBlackscreen>
    </>
  );
}
