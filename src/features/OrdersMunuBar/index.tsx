import { orderStatusMapper } from "../Order/lib/helpers";
import parseSearchParams from "../Order/lib/parseSearchParams";
import OrderFilter from "../OrderFilter";
import OrdersSort from "../OrderFilter/components/OrdersSort";

type OrdersMenuBarProps = {
  ordersFound: number;
  searchParams: Record<string, string | string[] | undefined>;
};
export default function OrdersMenuBar({
  ordersFound,
  searchParams,
}: OrdersMenuBarProps) {
  const sort = parseSearchParams({ sort: searchParams.sort }).sort ?? "desc";
  const status =
    parseSearchParams({ status: searchParams.status }).status ?? "Все";
  return (
    <>
      <div className="sticky top-12 z-10 flex h-12 w-full items-center justify-between border-b bg-darkgray">
        <div className="relative z-10 flex gap-2 bg-darkgray">
          <OrderFilter ordersFound={ordersFound} />
          <OrdersSort sort={sort} />
        </div>
        <span>{orderStatusMapper(status, true)}</span>
        {/* <ExcursionMenuBlock /> */}
      </div>
      <div id="excursionMenu" className="relative z-[-1]" />
    </>
  );
}
