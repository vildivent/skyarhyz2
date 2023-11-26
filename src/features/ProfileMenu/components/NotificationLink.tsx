"use client";

import IconWithRedDot from "~/components/IconWithRedDot";
import MenuLink from "~/shared/ui/Menu/MenuLink";
import { NotificationsIcon } from "~/shared/ui/icons";
import { api } from "~/trpc/react";

export default function NotificationLink() {
  const { data: newNotifications } = api.notification.getNewAmount.useQuery();
  return (
    <MenuLink
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
