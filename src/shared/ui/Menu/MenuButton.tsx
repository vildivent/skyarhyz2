import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

type MenuButtonProps = {
  title: string;
  icon?: ReactNode;
  selected?: boolean;
  padding?: boolean;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export default function MenuButton({
  title,
  icon,
  selected,
  padding,
  ...props
}: MenuButtonProps) {
  return (
    <button
      className={`flex w-full items-center gap-5 bg-darkgray px-5 py-2 hover:bg-grayish hover:text-primary disabled:text-smoke/50 disabled:hover:bg-darkgray disabled:hover:text-smoke/50
    ${selected ? "text-primary" : "text-smoke"} ${
      padding ? "pr-[3.75rem]" : ""
    }`}
      {...props}
    >
      <div className="h-5 w-5">{icon}</div>
      <span>{title}</span>
    </button>
  );
}
