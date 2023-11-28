import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Color = "blue" | "red" | "gray";
type ButtonType = Record<Color, string>;
const buttonType: ButtonType = {
  blue: "bg-secondary disabled:bg-secondary hover:bg-primary",
  red: "bg-red-600 disabled:bg-red-600 hover:bg-red-500",
  gray: "bg-lightgray disabled:bg-lightgray hover:bg-lightgray/70",
};
type ButtonProps = {
  color?: Color;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export default function Button({
  color = "blue",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`text-md w-fit rounded-md px-5 py-2 text-white no-underline transition disabled:opacity-50 ${buttonType[color]} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
