import { orderStatusMapper } from "../Order/lib/helpers";
import parseSearchParams from "../Order/lib/parseSearchParams";
import OrderFilter from "../OrderFilter";
import OrdersSort from "../OrderFilter/components/OrdersSort";
import ExcursionModeSwitch from "./components/ExcursionModeSwitch";

type OrdersMenuBarProps = {
  searchParams: Record<string, string | string[] | undefined>;
};
export default function OrdersMenuBar({ searchParams }: OrdersMenuBarProps) {
  const status = parseSearchParams({ status: searchParams.status }).status;
  return (
    <>
      <div className="sticky top-12 z-20 flex h-12 w-full items-center justify-between border-b bg-darkgray">
        <div className="relative z-10 flex gap-2 bg-darkgray">
          <OrderFilter />
          <OrdersSort />
        </div>
        <span>{status ? orderStatusMapper(status, true) : "Все"}</span>
        <ExcursionModeSwitch />
        {/* <ExcursionMenuBlock /> */}
      </div>
    </>
  );
}
