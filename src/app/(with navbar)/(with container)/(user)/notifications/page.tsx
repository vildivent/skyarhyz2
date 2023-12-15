import PageHeading from "~/shared/ui/PageHeading";
import authCheck from "~/shared/utils/authCheck";

export const metadata = {
  title: "Уведомления | SkyArhyz",
  description: "Уведомления",
};

export default async function Notifications() {
  await authCheck("/notifications");
  return <PageHeading>Уведомления</PageHeading>;
}
