import DateBlockAdmin from "~/features/Order/components/DateBlock/Admin";
import DateBlockUser from "~/features/Order/components/DateBlock/User";
import GroupSizeBlockAdmin from "~/features/Order/components/GroupSizeBlock/Admin";
import GroupSizeBlockUser from "~/features/Order/components/GroupSizeBlock/User";
import NameBlockAdmin from "~/features/Order/components/NameBlock/Admin";
import NameBlockUser from "~/features/Order/components/NameBlock/User";
import PhoneNumberBlockAdmin from "~/features/Order/components/PhoneNumberBlock/Admin";
import PhoneNumberBlockUser from "~/features/Order/components/PhoneNumberBlock/User";
import Container from "~/shared/ui/Container";
import { api } from "~/trpc/server";

export default async function Test() {
  const userOrders = await api.order.getByUser.query();
  const adminOrders = await api.order.getByAdmin.query({});
  const userOrder = userOrders.at(0);
  const adminOrder = adminOrders.at(0);
  if (!userOrder || !adminOrder) return null;
  return (
    <div className="flex w-full flex-col gap-2">
      <span>admin</span>
      <Container className="gap-2">
        <NameBlockAdmin name={adminOrder.name} userId={adminOrder.userId} />
        <PhoneNumberBlockAdmin
          id={adminOrder.id}
          phoneNumber={adminOrder.phoneNumber}
        />
        <GroupSizeBlockAdmin
          id={adminOrder.id}
          currentGroupSize={adminOrder.groupSize}
          query={{}}
        />
        <DateBlockAdmin
          id={adminOrder.id}
          dateFrom={adminOrder.dateFrom}
          dateTo={adminOrder.dateTo}
          query={{}}
        />
      </Container>
      <span>user</span>
      <Container className="gap-2">
        <NameBlockUser
          id={userOrder.id}
          currentName={userOrder.name}
          editable
        />
        <PhoneNumberBlockUser
          id={userOrder.id}
          currentPhoneNumber={userOrder.phoneNumber}
          editable
        />
        <GroupSizeBlockUser
          id={userOrder.id}
          currentGroupSize={userOrder.groupSize}
          editable
        />
        <DateBlockUser
          id={userOrder.id}
          dateFrom={userOrder.dateFrom}
          dateTo={userOrder.dateTo}
          editable
        />
      </Container>
    </div>
  );
}
