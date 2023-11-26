import { RxDashboard } from "react-icons/rx";
import MenuLink from "~/shared/ui/Menu/MenuLink";
import {
  GalleryIcon,
  NewsIcon,
  OrdersIcon,
  ReviewsIcon,
} from "~/shared/ui/icons";

export default function ContentAdmin() {
  return (
    <>
      <MenuLink
        href="/dashboard"
        title="Панель управления"
        icon={<RxDashboard size={20} />}
      />
      <MenuLink href="/dashboard/orders" title="Заявки" icon={<OrdersIcon />} />
      <MenuLink href="/dashboard/news" title="Новости" icon={<NewsIcon />} />
      <MenuLink
        href="/dashboard/gallery"
        title="Фотогалерея"
        icon={<GalleryIcon />}
      />
      <MenuLink
        href="/dashboard/reviews"
        title="Отзывы"
        icon={<ReviewsIcon />}
      />
    </>
  );
}
