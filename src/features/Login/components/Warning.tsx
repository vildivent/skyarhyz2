import Link from "next/link";

export default function Warning() {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <span className="text-red-500">Внимание! </span>Отказываясь от
        авторизации, для Вас будут следующие изменения:
      </div>
      <ol className="ml-4 flex list-decimal flex-col gap-2">
        <li>
          Не будет никаких уведомлений о состоянии Вашей заявки. С Вами
          попытаются связаться непосредственно за несколько часов до начала
          экскурсии. В случае отсутвтвия ответа Ваша заявка автоматически
          убирается из очереди.
        </li>
        <li>
          Пониженый приоритет в очереди на экскурсию по сравнению с
          авторизованными пользователями.
        </li>
      </ol>
      <div>
        Я ознакомлен(а) с рисками, но всё равно хочу продолжить без авторизации.{" "}
        <Link
          href="/order/create-no-auth"
          className="text-primary hover:text-secondary"
        >
          Оставить заявку
        </Link>
      </div>
    </div>
  );
}
