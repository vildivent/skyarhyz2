import Spinner from "~/shared/ui/Skeleton/Spinner";

export default function Loading() {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center">
      <Spinner />
    </div>
  );
}
