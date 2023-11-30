import { redirect } from "next/navigation";
import { env } from "~/env";
import OrderCreateForm from "~/features/OrderCreateForm";
import { getServerAuthSession } from "~/server/auth";

export default async function OrderCreate() {
  const session = await getServerAuthSession();
  if (!session)
    redirect(
      `/api/auth/signin?callbackUrl=${encodeURI(
        env.NEXTAUTH_URL + "/order/create",
      )}`,
    );
  return <OrderCreateForm />;
}
