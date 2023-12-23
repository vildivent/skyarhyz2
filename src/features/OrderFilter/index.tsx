import OrdersFound from "./components/OrdersFound";
import SearchFields from "./components/SearchFields";
import ViewController from "./components/ViewController";

export default function OrderFilter() {
  return (
    <ViewController>
      <h2 className="text-center text-4xl font-bold">Фильтры</h2>
      <SearchFields />
      <OrdersFound />
    </ViewController>
  );
}
