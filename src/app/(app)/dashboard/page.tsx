import { adminCheck } from "~/shared/utils/adminCheck";

export default async function Dashboard() {
  await adminCheck();

  return <div>Dashboard</div>;
}
