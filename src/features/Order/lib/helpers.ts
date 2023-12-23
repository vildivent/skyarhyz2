import type { ExcursionStatus, OrderStatus } from "@prisma/client";

export const orderStatusMapper = (status: OrderStatus, plural?: boolean) => {
  const ending = plural ? "ые" : "ая";
  type StatusDescription = Record<OrderStatus, string>;
  const statusDescription: StatusDescription = {
    new: `Нов${ending}`,
    registered: `Зарегистрированн${ending}`,
    active: `Активн${ending}`,
    fulfilled: `Завершённ${ending}`,
    cancelled: `Отменённ${ending}`,
    expired: `Просроченн${ending}`,
  };
  return statusDescription[status];
};

export const orderStatusMapperUser = (status: OrderStatus) => {
  type StatusDescription = Record<OrderStatus, string>;
  const statusDescription: StatusDescription = {
    new: "Ожидает подтверждения администратора",
    registered: "Зарегистрирована",
    active: "Находится в очереди на экскурсию",
    fulfilled: "Экскурсия состоялась",
    cancelled: "Отменена",
    expired: "Просрочена",
  };
  return statusDescription[status];
};

export const orderExcursionStatusMapper = (status: ExcursionStatus | null) => {
  if (!status) return "-";
  type StatusDescription = Record<ExcursionStatus, string>;
  const statusDescription: StatusDescription = {
    inqueue: "В очереди",
    pending: "Ожидает подтверждения",
    accepted: "Подтверждена",
    responded: "Принята",
    rejected: "Отклонена",
  };
  return statusDescription[status];
};

export function getBorderColor(status: ExcursionStatus | null) {
  if (!status) return "";
  type BorderColor = Record<ExcursionStatus, string>;
  const borderColor: BorderColor = {
    inqueue: "",
    pending: "rgb(234 179 8 / 0.5)",
    accepted: "rgb(34 197 94 / 0.5)",
    responded: "rgb(34 197 94 / 0.5)",
    rejected: "rgb(239 68 68 / 0.5)",
  };
  return borderColor[status];
}
