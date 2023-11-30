import Link from "next/link";
import Container from "~/shared/ui/Container";

export default function Success() {
  return (
    <Container className="items-center gap-5">
      <span className="text-2xl">Заявка оставлена!</span>
      <div className="flex gap-2">
        <span>Отслеживать состояние Вашей заявки можно в</span>
        <Link href="/notifications" className="text-primary hover:text-smoke">
          уведомлениях.
        </Link>
      </div>
    </Container>
  );
}
