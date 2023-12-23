import Container from "~/shared/ui/Container";

export default function Skeleton() {
  return (
    <div className="flex w-full flex-col gap-2" role="status">
      <OrderSkeleton />
      <OrderSkeleton />
      <OrderSkeleton />
      <OrderSkeleton />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

function OrderSkeleton() {
  return (
    <Container>
      <div className="flex h-10 items-center justify-between">
        <div className="h-3 w-40 animate-pulse rounded-full bg-neutral-600" />
        <div className="h-3 w-10 animate-pulse rounded-full bg-neutral-600" />
      </div>
      <div className="flex h-10 items-center">
        <div className="h-3 w-56 animate-pulse rounded-full bg-neutral-600" />
      </div>
      <div className="flex h-10 items-center gap-2 ">
        <div className="h-3 w-10 animate-pulse rounded-full bg-neutral-600" />
        <div className="h-3 w-10 animate-pulse rounded-full bg-neutral-600" />
        <div className="h-3 w-10 animate-pulse rounded-full bg-neutral-600" />
        <div className="h-3 w-10 animate-pulse rounded-full bg-neutral-600" />
      </div>
    </Container>
  );
}
