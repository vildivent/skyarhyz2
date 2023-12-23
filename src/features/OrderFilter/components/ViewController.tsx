"use client";
import { useRef, useState } from "react";
import { ModalBlackscreen } from "~/components/Modal";
import { useExcursionMenuStore } from "~/features/Excursion/lib/store";
import IconButton from "~/shared/ui/IconButton";
import useFilter from "../lib/hooks/useFilter";
import Animation from "./Animation";

export default function ViewController({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const excursionMode = useExcursionMenuStore((state) => state.isOpen);
  const { reset, filterWarning } = useFilter(excursionMode);
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <>
      <div className="relative">
        <IconButton
          ref={ref}
          btntype="filter"
          onClick={() => setIsOpen((prev) => !prev)}
          onKeyDown={(e) => {
            if (e.key === "Escape" && isOpen) {
              setIsOpen(false);
              ref.current?.blur();
            }
          }}
        />
        {filterWarning && (
          <div className="absolute right-0 top-0 text-red-500">!</div>
        )}
      </div>

      <ModalBlackscreen isOpen={isOpen} setIsOpen={setIsOpen}>
        <Animation isOpen={isOpen} className="absolute left-0 top-0">
          <div
            className="flex flex-col gap-2 text-ellipsis rounded-lg border bg-darkgray p-5 pb-10 outline-none"
            tabIndex={-1}
            onKeyDown={(e) => e.key === "Escape" && isOpen && setIsOpen(false)}
          >
            <div className="-m-3 flex justify-between">
              <IconButton btntype="filterReset" onClick={() => reset()} />
              <IconButton btntype="close" onClick={() => setIsOpen(false)} />
            </div>
            {children}
          </div>
        </Animation>
      </ModalBlackscreen>
    </>
  );
}
