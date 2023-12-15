// import AdminOrder from "~/features/Order/widgets/AdminOrder";
// import UserOrder from "~/features/Order/widgets/UserOrder";
import View from "~/features/OrderFilter/components/SearchFields";
// import { api } from "~/trpc/server";

export default async function Test() {
  // const userOrders = await api.order.getByUser.query();
  // const adminOrders = await api.order.getByAdmin.query({});
  // const userOrder = userOrders.at(0);
  // const adminOrder = adminOrders.at(0);
  // if (!userOrder || !adminOrder) return null;
  return (
    <div className="flex w-full flex-col gap-2">
      {/* <span>admin</span>
      <AdminOrder order={adminOrder} />
      <span>user</span>
      <UserOrder order={userOrder} /> */}
      <View />
    </div>
  );
}
