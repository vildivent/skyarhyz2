import type { DetailedHTMLProps, HTMLAttributes } from "react";

type RedDotProps = { size?: number | string } & DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export default function RedDot({
  size = "0.4rem",
  className = "",
}: RedDotProps) {
  return (
    <div
      className={`rounded-full bg-red-600 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
