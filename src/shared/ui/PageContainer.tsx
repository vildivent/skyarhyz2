import type { DetailedHTMLProps, HTMLAttributes } from "react";

export default function PageContainer({
  children,
  className = "",
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <main
      className={`mx-auto flex w-full max-w-3xl flex-col items-center p-2 md:p-5 ${className}`}
      {...props}
    >
      {children}
    </main>
  );
}
