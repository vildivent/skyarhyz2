import PageHeading from "~/shared/ui/PageHeading";
import { adminCheck } from "~/shared/utils/adminCheck";

export const metadata = {
  title: "Фотогалерея | Администрирование",
  description: "Фотогалерея",
};

export default async function Gallery() {
  await adminCheck("/dashboard/gallery");
  return <PageHeading>Фотогалерея</PageHeading>;
}
