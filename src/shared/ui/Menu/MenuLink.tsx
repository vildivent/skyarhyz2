"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEventHandler } from "react";

export type MenuLinkProps = {
  href: string;
  title: string;
  icon?: React.ReactNode;
  padding?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};
export default function MenuLink({
  href,
  title,
  icon,
  padding,
  onClick,
}: MenuLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`flex w-full items-center gap-5 bg-darkgray px-5 py-2 hover:bg-grayish hover:text-primary ${
        pathname === href ? "text-primary" : "text-smoke"
      } ${padding ? "pr-[3.75rem]" : ""}`}
      onClick={onClick}
    >
      <div className="h-5 w-5">{icon}</div>
      <span>{title}</span>
    </Link>
  );
}
