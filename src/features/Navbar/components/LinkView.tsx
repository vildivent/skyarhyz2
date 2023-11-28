"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavbarLinkProps = {
  href: string;
  title: string;
};
export default function LinkView({ href, title }: NavbarLinkProps) {
  const pathname = usePathname();
  const transparent = false; //useTransparent()
  return (
    <Link
      href={href}
      className={`flex h-full items-center px-3 hover:text-primary ${
        href === pathname ? "text-primary" : "text-smoke"
      } ${transparent ? "" : "hover:bg-grayish"} `}
    >
      <span>{title}</span>
    </Link>
  );
}
