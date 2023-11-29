import { OrdersIcon, ReviewsIcon } from "~/shared/ui/icons";
import ProfileMenuLink from "./ProfileMenuLink";

export default function ContentUser() {
  return (
    <>
      <ProfileMenuLink
        href="/profile/orders"
        title="Мои заявки"
        icon={<OrdersIcon />}
      />
      <ProfileMenuLink
        href="/profile/reviews"
        title="Мои отзывы"
        icon={<ReviewsIcon />}
      />
    </>
  );
}
