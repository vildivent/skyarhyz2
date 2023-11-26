import MenuLink from "~/shared/ui/Menu/MenuLink";
import { OrdersIcon, ReviewsIcon } from "~/shared/ui/icons";

export default function ContentUser() {
  return (
    <>
      <MenuLink
        href="/profile/orders"
        title="Мои заявки"
        icon={<OrdersIcon />}
      />
      <MenuLink
        href="/profile/reviews"
        title="Мои отзывы"
        icon={<ReviewsIcon />}
      />
    </>
  );
}
