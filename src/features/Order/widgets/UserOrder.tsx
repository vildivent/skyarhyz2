import Container from "~/shared/ui/Container";
import Line from "~/shared/ui/Line";
import type { OrderUser } from "~/trpc/shared";
import ExcursionDateBlock from "../components/ExcursionDateBlock";
import TimestampBlock from "../components/TimestampBlock";
import ViewController from "../components/ViewController";
import {
  CommentBlock,
  DateBlock,
  GroupSizeBlock,
  NameBlock,
  PhoneNumberBlock,
  PromocodeBlock,
  StatusBlock,
} from "../components/user";

export default function UserOrder({ order }: { order: OrderUser }) {
  const editable = order.status === "new" || order.status === "registered";
  return (
    <Container className="max-w-3xl">
      <ViewController
        visible={
          <>
            <NameBlock
              id={order.id}
              currentName={order.name}
              editable={editable}
            />
            <PhoneNumberBlock
              id={order.id}
              currentPhoneNumber={order.phoneNumber}
              editable={editable}
            />
          </>
        }
        infoBlock={<></>}
        top={<TimestampBlock timestamp={order.createdAt} />}
      >
        <GroupSizeBlock
          id={order.id}
          currentGroupSize={order.groupSize}
          editable={editable}
        />
        <DateBlock
          id={order.id}
          dateFrom={order.dateFrom}
          dateTo={order.dateTo}
          editable={editable}
        />
        <CommentBlock
          id={order.id}
          currentComment={order.comment}
          editable={editable}
        />
        <PromocodeBlock id={order.id} promocode={order.promocode?.code} />
        <Line />
        <StatusBlock id={order.id} status={order.status} />
        <ExcursionDateBlock id={order.id} date={order.excursionGroup?.time} />
      </ViewController>
    </Container>
  );
}
