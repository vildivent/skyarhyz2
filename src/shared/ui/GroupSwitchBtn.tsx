import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export default function GroupSwitchBtn({
  className = "",
  children,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      className={`h-8 w-8 rounded-md border disabled:bg-lightgray ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
