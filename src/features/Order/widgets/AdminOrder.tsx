import Container from "~/shared/ui/Container";
import Line from "~/shared/ui/Line";
import type { OrderAdmin } from "~/trpc/shared";
import ExcursionDateBlock from "../components/ExcursionDateBlock";
import ViewController from "../components/ViewController";
import {
  CommentBlock,
  DateBlock,
  ExcursionStatusBlock,
  GroupSizeBlock,
  InfoBlock,
  NameBlock,
  PhoneNumberBlock,
} from "../components/admin";
import { getBorderColor } from "../lib/helpers";

export default function AdminOrder({ order }: { order: OrderAdmin }) {
  const border = getBorderColor(order.excursionStatus);
  const excursionMode = true;
  return (
    <Container
      className="max-w-3xl"
      style={{ borderColor: excursionMode ? border : undefined }}
    >
      <ViewController
        visible={
          <>
            <NameBlock name={order.name} userId={order.createdBy?.id} />
            <PhoneNumberBlock id={order.id} phoneNumber={order.phoneNumber} />
          </>
        }
        infoBlock={<InfoBlock order={order} />}
        timestamp={order.createdAt}
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
        <ExcursionStatusBlock
          id={order.id}
          currentExcursionStatus={order.excursionStatus}
        />

        {/* <StatusBlock id={order.id} status={order.status} /> */}
        <ExcursionDateBlock id={order.id} date={order.excursionGroup?.time} />
        {/*<TimestampBlock date={order.createdAt} /> */}
      </ViewController>
    </Container>
  );
}
