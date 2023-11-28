import { redirect } from "next/navigation";
import DeleteAccount from "~/features/DeleteAccount";
import { getServerAuthSession } from "~/server/auth";
import Container from "~/shared/ui/Container";
import PageHeading from "~/shared/ui/PageHeading";

export default async function Profile() {
  const session = await getServerAuthSession();
  if (!session) redirect("/api/auth/signin");
  if (session.user.role === "guest")
    return (
      <Container className="gap-2">
        <PageHeading>Профиль</PageHeading>
        <DeleteAccount />
      </Container>
    );

  return (
    <Container className="gap-2">
      <PageHeading>Профиль</PageHeading>
      <span>user</span>
      <DeleteAccount />
    </Container>
  );
}
