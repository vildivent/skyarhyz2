import PageHeading from "~/shared/ui/PageHeading";
import { adminCheck } from "~/shared/utils/adminCheck";

export const metadata = {
  title: "Отзывы | Администрирование",
  description: "Отзывы",
};

export default async function Reviews() {
  await adminCheck("/dashboard/reviews");
  return <PageHeading>Отзывы</PageHeading>;
}
