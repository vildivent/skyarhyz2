import { format } from "date-fns";
import { GoPeople, GoPerson } from "react-icons/go";
import { OrdersIcon } from "~/shared/ui/icons";

export type GroupData = {
  number: number;
  time: Date | null;
  peopleConfirmed: number;
  peopleInGroup: number;
  ordersConfirmed: number;
  ordersInGroup: number;
};
type GroupContentProps = { group: GroupData };
export function GroupContent({ group }: GroupContentProps) {
  const size = 20;
  return (
    <div className="flex flex-col items-center gap-3">
      <ContentRow icon={<GoPeople size={size} />}>
        {group.number + (group.time ? " - " + format(group.time, "hh:mm") : "")}
      </ContentRow>
      <ContentRow icon={<GoPerson size={size} />}>
        {group.peopleConfirmed + " ( " + group.peopleConfirmed + " )"}
      </ContentRow>
      <ContentRow icon={<OrdersIcon />}>
        {group.ordersConfirmed + " ( " + group.ordersInGroup + " )"}
      </ContentRow>
    </div>
  );
}

export type ZeroGroupData = {
  peopleInGroup: number;
  peopleTotal: number;
  ordersInGroup: number;
  ordersTotal: number;
};
type ZeroGroupProps = { group: ZeroGroupData };
export function ZeroGroupContent({ group }: ZeroGroupProps) {
  const size = 20;
  return (
    <div className="flex flex-col items-center gap-3">
      <ContentRow icon={<GoPeople size={size} />}>-</ContentRow>
      <ContentRow icon={<GoPerson size={size} />}>
        {group.peopleInGroup + " / " + group.peopleTotal}
      </ContentRow>
      <ContentRow icon={<OrdersIcon />}>
        {group.ordersInGroup + " / " + group.ordersTotal}
      </ContentRow>
    </div>
  );
}

type ContentRowProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
};
function ContentRow({ icon, children }: ContentRowProps) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      {icon}
      <span>{children}</span>
    </div>
  );
}
