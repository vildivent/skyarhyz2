"use client";
import Link from "next/link";
import { useState } from "react";
import { NotificationsIcon } from "~/shared/ui/icons";
import { api } from "~/trpc/react";

export default function NotificationsNavbar() {
  const [hovered, setHovered] = useState(false);
  const { data: newNotifications } = api.notification.getNewAmount.useQuery();
  return (
    <Link
      href="/notifications"
      className="relative my-auto flex h-10 w-10 items-center justify-center text-smoke hover:text-primary"
      onMouseLeave={() => setHovered(false)}
      onMouseEnter={() => setHovered(true)}
    >
      <NotificationsIcon width={24} height={24} />
      {!!newNotifications && (
        <Blob newNotifications={newNotifications} hovered={hovered} />
      )}
    </Link>
  );
}

type BlobProps = {
  newNotifications: number;
  hovered: boolean;
};
const Blob = ({ newNotifications, hovered }: BlobProps) => {
  return (
    <div
      className={`absolute top-0 rounded-full bg-red-600 p-[1px] text-xs text-white transition hover:text-white ${
        hovered ? "scale-0" : ""
      } ${
        newNotifications > 99
          ? "right-[-0.5rem]"
          : `${newNotifications < 10 ? "right-0 px-[5px]" : "right-0"}`
      }`}
    >
      {newNotifications > 99 ? "99+" : newNotifications}
    </div>
  );
};
