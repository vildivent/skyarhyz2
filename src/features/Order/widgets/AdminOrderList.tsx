import Container from "~/shared/ui/Container";
import { api } from "~/trpc/server";
import parseSearchParams from "../lib/parseSearchParams";
import AdminOrder from "./AdminOrder";

type AdminOrderListProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function AdminOrderList({
  searchParams,
}: AdminOrderListProps) {
  const orders = await api.order.getByAdmin.query(
    parseSearchParams(searchParams),
  );
  if (orders.length === 0)
    return (
      <Container className="mx-auto !w-fit text-center text-xl">
        Заявок нет
      </Container>
    );
  return (
    <div className="flex w-full max-w-xl flex-col-reverse gap-2">
      {orders.reverse().map((order) => (
        <AdminOrder key={order.id} order={order} />
      ))}
    </div>
  );
}
