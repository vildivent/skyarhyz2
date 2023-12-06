import { BsBookmark } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { IoCalendarOutline } from "react-icons/io5";
import IconWithTooltip from "~/components/IconWithTooltip";
import { OrdersIcon, ReviewsIcon } from "~/shared/ui/icons";
import countDaysLeft from "~/shared/utils/countDaysLeft";
import type { OrderAdmin } from "~/trpc/shared";

export default function InfoBlockAdmin({ order }: { order: OrderAdmin }) {
  const size = 20;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center">
        <IconWithTooltip
          id={"admin-info-groupSize-" + order.id}
          icon={<GoPerson size={size} />}
          tooltip="Размер группы"
        />
        <span>{order.groupSize}</span>
      </div>
      <div className="flex items-center">
        <IconWithTooltip
          id={"admin-info-daysLeft-" + order.id}
          icon={<IoCalendarOutline size={size} />}
          tooltip="Дней в запасе"
        />
        <span>{countDaysLeft(new Date(), order.dateTo)}</span>
      </div>
      <div className="flex items-center">
        <IconWithTooltip
          id={"admin-info-ordersCount-" + order.id}
          icon={<OrdersIcon height={size} width={size} />}
          tooltip="Заявок у пользователя"
        />
        <span>{order.createdBy?.orders.length ?? "-"}</span>
      </div>

      {/* {confirmation && (
        <div className="flex items-center">
          <IconWithHint
            icon={<NotificationsIcon height={size} width={size} />}
            hint={`Прошло с момента
отправления последнего
подтверждения`}
          />
          <span>{confirmation}</span>
        </div>
      )} */}
      {order.note && (
        <IconWithTooltip
          id={"admin-info-note-" + order.id}
          icon={<ReviewsIcon height={size} width={size} />}
          tooltip="Есть заметка"
        />
      )}
      {order.promocode && (
        <IconWithTooltip
          id={"admin-info-promocode-" + order.id}
          icon={<BsBookmark size={size} />}
          tooltip="Есть промокод"
        />
      )}
    </div>
  );
}
