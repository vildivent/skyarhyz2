import type { OrderAdmin } from "~/trpc/shared";
import AdminOrder from "./AdminOrder";
import Container from "~/shared/ui/Container";

export default function AdminOrderList({ orders }: { orders: OrderAdmin[] }) {
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
