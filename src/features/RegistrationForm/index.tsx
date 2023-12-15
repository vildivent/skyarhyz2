import { redirect } from "next/navigation";
import AuthContainer from "~/components/AuthContainer";
import { api } from "~/trpc/server";
import Form from "./components/Form";

export default async function RegistrationForm() {
  const user = await api.user.registration.query();
  if (!user) redirect("/signin");
  return (
    <AuthContainer title="Завершение регистрации">
      <Form user={user} />
    </AuthContainer>
  );
}
