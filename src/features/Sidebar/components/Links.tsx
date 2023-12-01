import {
  AboutIcon,
  CamerasIcon,
  ContactsIcon,
  ExcursionsIcon,
  GalleryIcon,
  MainIcon,
  MapIcon,
  NewsIcon,
  ReviewsIcon,
  WeatherIcon,
} from "~/shared/ui/icons";
import GroupsController from "./GroupsController";
import SidebarMenuLink from "./SidebarMenuLink";

export default function Links() {
  return (
    <div className="relative flex flex-col pb-5">
      <SidebarMenuLink href="/" title="Главная" icon={<MainIcon />} padding />
      <SidebarMenuLink
        href="/excursions"
        title="Экскурсии"
        icon={<ExcursionsIcon />}
        padding
      />
      <SidebarMenuLink
        href="/pathway"
        title="Как добраться"
        icon={<MapIcon />}
        padding
      />
      <SidebarMenuLink
        href="/news"
        title="Новости"
        icon={<NewsIcon />}
        padding
      />
      <SidebarMenuLink
        href="/gallery"
        title="Фотогалерея"
        icon={<GalleryIcon />}
        padding
      />
      <SidebarMenuLink
        href="/reviews"
        title="Отзывы"
        icon={<ReviewsIcon />}
        padding
      />
      <SidebarMenuLink
        href="/webcams"
        title="Камеры САО РАН"
        icon={<CamerasIcon />}
        padding
      />
      <SidebarMenuLink
        href="/weather"
        title="Погода в обсерватории"
        icon={<WeatherIcon />}
        padding
      />
      <GroupsController
        activitiesGroup={
          <>
            <SidebarMenuLink
              href="/observatory-tours"
              title="Экскурсии в обсерваторию"
            />
            <SidebarMenuLink href="/planetarium" title="Планетарий" />
          </>
        }
        collabGroup={
          <>
            <SidebarMenuLink
              href="/collaboration"
              title="Сотрудничество со мной"
            />
            <SidebarMenuLink href="/transfer" title="Трансфер" />
            <SidebarMenuLink href="/lodging" title="Жилье" />
          </>
        }
      />
      <SidebarMenuLink
        href="/about"
        title="Обо мне"
        icon={<AboutIcon />}
        padding
      />
      <SidebarMenuLink
        href="/contacts"
        title="Контакты"
        icon={<ContactsIcon />}
        padding
      />
    </div>
  );
}
