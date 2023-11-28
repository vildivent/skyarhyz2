import { notFound } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import RegistrationForm from "~/features/RegistrationForm";

export default async function Registration() {
  const session = await getServerAuthSession();
  if (!session || session.user.role !== "guest") return notFound();
  return <RegistrationForm />;
}
