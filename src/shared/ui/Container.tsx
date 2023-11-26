import type { DetailedHTMLProps, HTMLAttributes } from "react";

export default function Container({
  children,
  className = "",
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div
      className={`flex w-full flex-col text-ellipsis rounded-lg border bg-darkgray/70 p-5 backdrop-blur-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
