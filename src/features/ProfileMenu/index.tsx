import UserAvatar from "~/components/UserAvatar";
import { getServerAuthSession } from "~/server/auth";
import Content from "./components/Content";
import Controller from "./components/Controller";
import LoginButton from "./components/LoginButton";

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
