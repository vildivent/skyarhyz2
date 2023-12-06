import type { OrderStatus } from "@prisma/client";
import IconWithTooltip from "~/components/IconWithTooltip";
import { OrderStatusIcon } from "~/shared/ui/icons";
import { orderStatusMapperUser } from "../../lib/helpers";

type StatusBlockProps = {
  id: string;
  status: OrderStatus;
};
export default function StatusBlockUser({ id, status }: StatusBlockProps) {
  const size = 23;
  const title = orderStatusMapperUser(status);

  return (
    <div className="flex items-start md:gap-2">
      <IconWithTooltip
        id={"status-" + id}
        icon={<OrderStatusIcon height={size} width={size} />}
        tooltip="Статус заявки"
      />
      <span className="my-auto ml-5">{title}</span>
    </div>
  );
}
