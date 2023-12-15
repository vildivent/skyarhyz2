import PageHeading from "~/shared/ui/PageHeading";
import authCheck from "~/shared/utils/authCheck";

export const metadata = {
  title: "Мои заявки | SkyArhyz",
  description: "Мои заявки",
};

export default async function MyOrders() {
  await authCheck("/my-orders");
  return <PageHeading>Мои заявки</PageHeading>;
}
