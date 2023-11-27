import Link from "next/link";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function Logo({
  className = "",
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div className={`font-h text-4xl font-bold ${className}`} {...props}>
      <span className="text-primary">Sky</span>
      <span>Arhyz</span>
    </div>
  );
}
export function LogoNavbar() {
  return (
    <div className="ml-2 flex flex-1 items-center md:ml-10">
      <Link href="/">
        <Logo className="!text-3xl" />
      </Link>
    </div>
  );
}
export function LogoAuth() {
  return (
    <div className="mb-5 flex">
      <Link href="/">
        <Logo />
      </Link>
    </div>
  );
}
