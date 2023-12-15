import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import Button from "~/shared/ui/Button";

export const metadata = {
  title: "Главная | SkyArhyz",
  description: "SkyArhyz",
};

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <div className="my-auto flex flex-col items-center gap-5">
      <Link href="/order/create">
        <Button tabIndex={-1}>Оставить заявку</Button>
      </Link>
      <Link href="/test">
        <Button tabIndex={-1}>Test</Button>
      </Link>
      {session && <span>Logged in as {session.user?.name}</span>}
    </div>
  );
}
