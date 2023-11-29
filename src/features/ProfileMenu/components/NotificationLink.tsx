"use client";
import IconWithRedDot from "~/components/IconWithRedDot";
import { NotificationsIcon } from "~/shared/ui/icons";
import { api } from "~/trpc/react";
import ProfileMenuLink from "./ProfileMenuLink";

export default function NotificationLink() {
  const { data: newNotifications } = api.notification.getNewAmount.useQuery();
  return (
    <ProfileMenuLink
      href="/notifications"
      title={`Уведомления${
        newNotifications
          ? ` - ${newNotifications > 99 ? `99+` : newNotifications}`
          : ""
      }`}
      icon={
        newNotifications ? (
          <IconWithRedDot icon={<NotificationsIcon />} />
        ) : (
          <NotificationsIcon />
        )
      }
    />
  );
}
