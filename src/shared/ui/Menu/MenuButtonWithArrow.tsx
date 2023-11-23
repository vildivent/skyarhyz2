import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { AiOutlineDown } from "react-icons/ai";

type MenuButtonWithArrowProps = {
  title: string;
  icon?: ReactNode;
  reverseArrow?: boolean;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export const MenuButtonWithArrow = ({
  title,
  icon,
  reverseArrow,
  ...props
}: MenuButtonWithArrowProps) => {
  return (
    <button
      className="flex w-full items-center justify-between gap-5 bg-darkgray px-5 py-2 hover:bg-grayish hover:text-primary"
      {...props}
    >
      <div className="flex items-center gap-5">
        <div className="h-5 w-5">{icon}</div>
        <span>{title}</span>
      </div>

      <AiOutlineDown
        size={20}
        className={`transition-transform duration-300 ${
          reverseArrow ? "rotate-180" : ""
        }`}
      />
    </button>
  );
};
