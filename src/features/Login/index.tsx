import Container from "~/shared/ui/Container";
import { LogoAuth } from "~/shared/ui/Logo";
import LoginController from "./components/LoginController";
import Warning from "./components/Warning";

export default function LogIn() {
  return (
    <Container className="gap-5 md:!px-20 md:!py-10">
      <LogoAuth />
      <h1 className="font-p text-2xl font-medium md:text-3xl">Авторизация</h1>
      <p>чтобы продолжить, авторизуйтесь с помощью одного из сервисов:</p>
      <LoginController warningMessage={<Warning />} />
    </Container>
  );
}
