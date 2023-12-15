import AuthContainer from "~/components/AuthContainer";
import LoginController from "./components/LoginController";
import Warning from "./components/Warning";

export default function LogIn() {
  return (
    <AuthContainer title="Авторизация">
      <p>чтобы продолжить, авторизуйтесь с помощью одного из сервисов:</p>
      <LoginController warningMessage={<Warning />} />
    </AuthContainer>
  );
}
