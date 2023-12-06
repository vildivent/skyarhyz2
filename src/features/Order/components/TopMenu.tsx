import type { Dispatch, ReactNode, SetStateAction } from "react";
import IconButton from "~/shared/ui/IconButton";

type TopMenuProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
};
export default function TopMenu({ isOpen, setIsOpen, children }: TopMenuProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      {children}
      <IconButton
        btntype="arrowDown"
        className={`${isOpen ? "rotate-180" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
}
