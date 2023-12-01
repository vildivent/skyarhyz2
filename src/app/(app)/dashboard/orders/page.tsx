import PageHeading from "~/shared/ui/PageHeading";
import { adminCheck } from "~/shared/utils/adminCheck";

export const metadata = {
  title: "Заявки | Администрирование",
  description: "Заявки",
};

export default async function Orders() {
  await adminCheck("/dashboard/orders");
  return <PageHeading>Заявки</PageHeading>;
}
