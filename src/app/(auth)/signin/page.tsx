import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import LogIn from "~/features/Login";

export default async function SignIn() {
  const session = await getServerAuthSession();
  if (session) redirect("/signout");
  return (
    <>
      <LogIn />
      <TermsOfService />
    </>
  );
}

function TermsOfService() {
  return (
    <p className="mt-5 flex flex-wrap justify-center gap-x-2">
      <span>Авторизуясь, Вы соглашаетесь с </span>
      <Link
        href="/terms-of-service"
        className="whitespace-nowrap text-primary underline hover:text-secondary"
      >
        Условиями использования
      </Link>
    </p>
  );
}
