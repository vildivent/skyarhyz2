import { ExcursionStatus, OrderStatus, PromocodeType } from "@prisma/client";

export const orderStatusMapper = (status: string, plural?: boolean) => {
  const ending = plural ? "ые" : "ая";

  switch (status) {
    case OrderStatus.new:
      return `Нов${ending}`;
    case OrderStatus.registered:
      return `Зарегистрированн${ending}`;
    case OrderStatus.active:
      return `Активн${ending}`;
    case OrderStatus.fulfilled:
      return `Завершённ${ending}`;
    case OrderStatus.cancelled:
      return `Отменённ${ending}`;
    default:
      return status;
  }
};

export const orderStatusMapperUser = (status: string) => {
  switch (status) {
    case OrderStatus.new:
      return "Ожидает подтверждения администратора";
    case OrderStatus.registered:
      return "Зарегистрирована";
    case OrderStatus.active:
      return "Находится в очереди на экскурсию";
    case OrderStatus.fulfilled:
      return "Экскурсия состоялась";
    case OrderStatus.cancelled:
      return "Отменена или просрочена";
    default:
      return status;
  }
};

export const promocodeTypeMapper = (type: string) => {
  switch (type) {
    case PromocodeType.queuePriority:
      return "Приоритет в очереди";
    case PromocodeType.discount:
      return "Скидка 5%";
    default:
      return type;
  }
};

export const orderExcursionStatusMapper = (status: string) => {
  switch (status) {
    case ExcursionStatus.inqueue:
      return "В очереди";
    case ExcursionStatus.pending:
      return "В ожидании";
    case ExcursionStatus.accepted:
      return "Подтверждена";
    case ExcursionStatus.cancelled:
      return "Отменена";
    default:
      return status;
  }
};

export function getBorderColor(input: ExcursionStatus | null) {
  if (!input) return "";
  type BorderColor = Record<ExcursionStatus, string>;
  const borderColor: BorderColor = {
    cancelled: "rgb(239 68 68 / 0.5)",
    pending: "rgb(234 179 8 / 0.5)",
    accepted: "rgb(34 197 94 / 0.5)",
    inqueue: "",
  };
  return borderColor[input];
}
