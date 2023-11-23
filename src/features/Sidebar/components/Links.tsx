import MenuLink from "~/shared/ui/Menu/MenuLink";
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

export default function Links() {
  return (
    <div className="overflow-y-auto">
      <div className="relative flex flex-col pb-5">
        <MenuLink href="/" title="Главная" icon={<MainIcon />} padding />
        <MenuLink
          href="/excursions"
          title="Экскурсии"
          icon={<ExcursionsIcon />}
          padding
        />
        <MenuLink
          href="/pathway"
          title="Как добраться"
          icon={<MapIcon />}
          padding
        />
        <MenuLink href="/news" title="Новости" icon={<NewsIcon />} padding />
        <MenuLink
          href="/photogallery"
          title="Фотогалерея"
          icon={<GalleryIcon />}
          padding
        />
        <MenuLink
          href="/reviews"
          title="Отзывы"
          icon={<ReviewsIcon />}
          padding
        />
        <MenuLink
          href="/webcams"
          title="Камеры САО РАН"
          icon={<CamerasIcon />}
          padding
        />
        <MenuLink
          href="/weather"
          title="Погода в обсерватории"
          icon={<WeatherIcon />}
          padding
        />
        <GroupsController
          activitiesGroup={
            <>
              <MenuLink
                href="/observatory-tours"
                title="Экскурсии в обсерваторию"
              />
              <MenuLink href="/planetarium" title="Планетарий" />
            </>
          }
          collabGroup={
            <>
              <MenuLink href="/collaboration" title="Сотрудничество со мной" />
              <MenuLink href="/transfer" title="Трансфер" />
              <MenuLink href="/lodging" title="Жилье" />
            </>
          }
        />
        <MenuLink href="/about" title="Обо мне" icon={<AboutIcon />} padding />
        <MenuLink
          href="/contacts"
          title="Контакты"
          icon={<ContactsIcon />}
          padding
        />
      </div>
    </div>
  );
}
