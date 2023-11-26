import { getServerAuthSession } from "~/server/auth";
import LoginButton from "./components/LoginButton";
import UserAvatar from "~/components/UserAvatar";
import Controller from "./components/Controller";
import Content from "./components/Content";

export default async function ProfileMenu() {
  const session = await getServerAuthSession();
  if (!session) return <LoginButton />;
  return (
    <Controller
      userAvatar={
        <UserAvatar src={session.user.image} alt={session.user.name} />
      }
      content={<Content />}
    />
  );
}
