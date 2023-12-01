import { OrdersIcon, ReviewsIcon } from "~/shared/ui/icons";
import ProfileMenuLink from "./ProfileMenuLink";

export default function ContentUser() {
  return (
    <>
      <ProfileMenuLink
        href="/my-orders"
        title="Мои заявки"
        icon={<OrdersIcon />}
      />
      <ProfileMenuLink
        href="/my-reviews"
        title="Мои отзывы"
        icon={<ReviewsIcon />}
      />
    </>
  );
}
