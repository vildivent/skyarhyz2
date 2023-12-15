import parseSearchParams from "~/features/Order/lib/parseSearchParams";
import AdminOrderList from "~/features/Order/widgets/AdminOrderList";
import OrdersMenuBar from "~/features/OrdersMunuBar";
import PageContainer from "~/shared/ui/PageContainer";
import PageHeading from "~/shared/ui/PageHeading";
import { adminCheck } from "~/shared/utils/adminCheck";
import { api } from "~/trpc/server";

export const metadata = {
  title: "Заявки | Администрирование",
  description: "Заявки",
};

export default async function Orders({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  await adminCheck("/dashboard/orders");
  const orders = await api.order.getByAdmin.query(
    parseSearchParams(searchParams),
  );
  return (
    <>
      <OrdersMenuBar ordersFound={orders.length} searchParams={searchParams} />
      <PageContainer className="items-center">
        <PageHeading>Заявки</PageHeading>
        <AdminOrderList orders={orders} />
      </PageContainer>
    </>
  );
}
