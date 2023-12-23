import { Suspense } from "react";
import Excursion from "~/features/Excursion";
import Skeleton from "~/features/Order/components/Skeleton";
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

  const excursion = await api.excursion.get.query();
  return (
    <>
      <OrdersMenuBar searchParams={searchParams} />
      <Excursion excursion={excursion} />
      <PageContainer className="items-center">
        <PageHeading>Заявки</PageHeading>
        <Suspense key={JSON.stringify(searchParams)} fallback={<Skeleton />}>
          <AdminOrderList searchParams={searchParams} />
        </Suspense>
      </PageContainer>
    </>
  );
}
