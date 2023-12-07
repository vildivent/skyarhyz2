import Link from "next/link";

type NameBlockProps = {
  name: string;
  userId?: string | null;
};
export default function NameBlockAdmin({ name, userId }: NameBlockProps) {
  return (
    <div className="my-auto flex h-10 items-center overflow-hidden text-ellipsis">
      {userId ? (
        <Link
          className="my-auto ml-[3.75rem] underline hover:text-primary"
          href={`/profile?id=${userId}`}
        >
          {name}
        </Link>
      ) : (
        <span className="ml-5 overflow-hidden text-ellipsis">{name}</span>
      )}
    </div>
  );
}
