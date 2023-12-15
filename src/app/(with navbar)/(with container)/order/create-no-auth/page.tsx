import OrderCreateForm from "~/features/OrderCreateForm";
import PageHeading from "~/shared/ui/PageHeading";
import authCheck from "~/shared/utils/authCheck";

export const metadata = {
  title: "Оставить заявку | SkyArhyz",
  description: "Оставить заявку",
};

export default async function OrderCreate() {
  await authCheck("/order/create");
  return (
    <>
      <PageHeading>Оставить заявку</PageHeading> <OrderCreateForm />
      <div className="flex h-full w-full flex-1 items-center justify-center"></div>
    </>
  );
}
