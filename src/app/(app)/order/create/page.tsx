import OrderCreateForm from "~/features/OrderCreateForm";
import authCheck from "~/shared/utils/authCheck";

export const metadata = {
  title: "Оставить заявку | SkyArhyz",
  description: "Оставить заявку",
};

export default async function OrderCreate() {
  await authCheck("/order/create");
  return <OrderCreateForm />;
}
