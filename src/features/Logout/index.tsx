import AuthContainer from "~/components/AuthContainer";
import LogOutBtn from "./components/LogOutBtn";

export default function LogOut({ username }: { username?: string | null }) {
  return (
    <AuthContainer title="Выход из учётной записи">
      {username && (
        <span>
          Вы авторизованы, как <span className="text-primary">{username}</span>.
        </span>
      )}
      <LogOutBtn />
    </AuthContainer>
  );
}
