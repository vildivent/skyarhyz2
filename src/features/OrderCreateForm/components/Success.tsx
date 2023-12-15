import Link from "next/link";

export default function Success() {
  return (
    <div className="flex flex-col gap-2 md:p-5">
      <span className="text-2xl">Заявка оставлена!</span>
      <span>
        Отслеживать состояние заявки можно в{" "}
        <Link href="/notifications" className="text-primary hover:text-smoke">
          уведомлениях.
        </Link>
      </span>
    </div>
  );
}
