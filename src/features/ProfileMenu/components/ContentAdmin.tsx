import { RxDashboard } from "react-icons/rx";
import {
  GalleryIcon,
  NewsIcon,
  OrdersIcon,
  ReviewsIcon,
} from "~/shared/ui/icons";
import ProfileMenuLink from "./ProfileMenuLink";

export default function ContentAdmin() {
  return (
    <>
      <ProfileMenuLink
        href="/dashboard"
        title="Панель управления"
        icon={<RxDashboard size={20} />}
      />
      <ProfileMenuLink
        href="/dashboard/orders"
        title="Заявки"
        icon={<OrdersIcon />}
      />
      <ProfileMenuLink
        href="/dashboard/news"
        title="Новости"
        icon={<NewsIcon />}
      />
      <ProfileMenuLink
        href="/dashboard/gallery"
        title="Фотогалерея"
        icon={<GalleryIcon />}
      />
      <ProfileMenuLink
        href="/dashboard/reviews"
        title="Отзывы"
        icon={<ReviewsIcon />}
      />
    </>
  );
}
