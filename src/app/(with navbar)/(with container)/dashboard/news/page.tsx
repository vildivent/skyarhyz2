import PageHeading from "~/shared/ui/PageHeading";
import { adminCheck } from "~/shared/utils/adminCheck";

export const metadata = {
  title: "Новости | Администрирование",
  description: "Новости",
};

export default async function News() {
  await adminCheck("/dashboard/news");
  return <PageHeading>Новости</PageHeading>;
}
