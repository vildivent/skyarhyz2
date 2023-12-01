import PageHeading from "~/shared/ui/PageHeading";
import { adminCheck } from "~/shared/utils/adminCheck";

export const metadata = {
  title: "Панель управления | Администрирование",
  description: "Панель управления",
};

export default async function Dashboard() {
  await adminCheck("/dashboard");
  return <PageHeading>Панель управления</PageHeading>;
}
