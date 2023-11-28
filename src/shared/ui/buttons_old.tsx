import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type BtnProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const GroupSwitchBtn = ({
  className = "",
  children,
  ...props
}: BtnProps) => {
  return (
    <button
      className={`h-8 w-8 rounded-md border disabled:bg-lightgray ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
