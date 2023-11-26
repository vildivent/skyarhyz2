import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

type ButtonAuthProps = {
  text: string;
  icon?: ReactNode;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export default function ButtonAuth({
  text,
  icon,
  className = "",
  ...props
}: ButtonAuthProps) {
  return (
    <button
      className={`rounded-md bg-lightgray px-3 py-2 hover:bg-lightgray/70 ${className}`}
      {...props}
    >
      <div className="flex items-center justify-center gap-5">
        {icon}
        <span>{text}</span>
      </div>
    </button>
  );
}
