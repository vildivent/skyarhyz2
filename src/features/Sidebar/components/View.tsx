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
          } absolute bottom-0 right-0 top-0 h-full max-w-[100vw] border bg-darkgray transition-all duration-500`}
        >
          <div className="flex items-center justify-end p-2">
            <IconButton btntype="close" onClick={() => setIsOpen(false)} />
          </div>
          {/* change height when change size of top section with close button */}
          <div className="h-[calc(100lvh-3.5rem)] overflow-y-auto">
            {children}
          </div>
        </div>
      </ModalBlackscreen>
    </>
  );
}
