import Container from "~/shared/ui/Container";
import { LogoAuth } from "~/shared/ui/Logo";
import Form from "./components/Form";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function RegistrationForm() {
  const user = await api.user.registration.query();
  if (!user) redirect("/signin");
  return (
    <Container className="!w-fit gap-5 md:!px-20 md:!py-10">
      <LogoAuth />
      <h1 className="font-p text-2xl font-medium md:text-3xl">
        Завершение регистрации
      </h1>
      <Form user={user} />
    </Container>
  );
}
