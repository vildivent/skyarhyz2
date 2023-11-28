import LinkView from "./LinkView";

export function Links() {
  return (
    <div className="hidden items-center justify-center text-center lg:flex">
      <LinkView href="/excursions" title="Экскурсии" />
      <LinkView href="/pathway" title="Как добраться" />
      <LinkView href="/news" title="Новости" />
      <LinkView href="/gallery" title="Фотогалерея" />
      <LinkView href="/reviews" title="Отзывы" />
    </div>
  );
}

export function LinksDashboard() {
  return (
    <div className="hidden items-center justify-center text-center lg:flex">
      <LinkView href="/dashboard" title="Панель управления" />
      <LinkView href="/dashboard/orders" title="Заявки" />
      <LinkView href="/dashboard/news" title="Новости" />
      <LinkView href="/dashboard/gallery" title="Фотогалерея" />
      <LinkView href="/dashboard/reviews" title="Отзывы" />
    </div>
  );
}
