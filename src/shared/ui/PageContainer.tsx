import type { DetailedHTMLProps, HTMLAttributes } from "react";

export default function PageContainer({
  children,
  className = "",
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <main
      className={`flex w-full max-w-4xl flex-col items-center p-2 md:p-5 ${className}`}
      {...props}
    >
      {children}
    </main>
  );
}
