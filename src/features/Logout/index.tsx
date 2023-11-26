import Container from "~/shared/ui/Container";
import { LogoAuth } from "~/shared/ui/Logo";
import LogOutBtn from "./components/LogOutBtn";

export default function LogOut({ username }: { username?: string | null }) {
  return (
    <Container className="gap-5 md:!px-20 md:!py-10">
      <LogoAuth />
      <h1 className="font-p text-3xl font-medium">Выход из учётной записи</h1>
      {username && (
        <span>
          Вы авторизованы, как <span className="text-primary">{username}</span>.
        </span>
      )}
      <LogOutBtn />
    </Container>
  );
}
