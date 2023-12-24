import Line from "~/shared/ui/Line";
import type { OrderAdmin } from "~/trpc/shared";
import ExcursionDateBlock from "../components/ExcursionDateBlock";
import ViewController from "../components/ViewController";
import {
  CommentBlock,
  DateBlock,
  ExcursionStatusBlock,
  GroupSizeBlock,
  GroupSwitchBlock,
  InfoBlock,
  NameBlock,
  PhoneNumberBlock,
  StatusBlock,
} from "../components/admin";

export default function AdminOrder({ order }: { order: OrderAdmin }) {
  return (
    <ViewController
      visible={
        <PhoneNumberBlock id={order.id} phoneNumber={order.phoneNumber} />
      }
      infoBlock={<InfoBlock order={order} />}
      top={
        <NameBlock
          id={order.id}
          name={order.name}
          userId={order.createdBy?.id}
        />
      }
      excursionStatus={order.excursionStatus}
    >
      <GroupSizeBlock id={order.id} currentGroupSize={order.groupSize} />
      <DateBlock
        id={order.id}
        dateFrom={order.dateFrom}
        dateTo={order.dateTo}
      />
      <CommentBlock id={order.id} comment={order.comment} />
      {/* <PromocodeBlock promocode={order.promocode?.code || null} /> */}
      <Line />
      <StatusBlock id={order.id} currentStatus={order.status} />
      <GroupSwitchBlock
        id={order.id}
        currentGroup={order.excursionGroup?.number}
        totalGroups={order.excursion?.excursionGroups.length}
      />
      <ExcursionStatusBlock
        id={order.id}
        currentExcursionStatus={order.excursionStatus}
      />

      <ExcursionDateBlock id={order.id} date={order.excursionGroup?.time} />
      {/*<TimestampBlock date={order.createdAt} /> */}
    </ViewController>
  );
}
