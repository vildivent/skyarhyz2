import type { DetailedHTMLProps, HTMLAttributes } from "react";

export default function PageHeading({
  children,
  className = "",
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h1
      className={`mb-2 text-center font-h text-4xl font-bold md:mb-5 md:text-5xl ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
}
