import SearchFields from "./components/SearchFields";
import ViewController from "./components/ViewController";

export default function OrderFilter({ ordersFound }: { ordersFound: number }) {
  return (
    <ViewController>
      <h2 className="text-center text-4xl font-bold">Фильтры</h2>
      <SearchFields />
      <span className="text-center">{`Найдено заявок: ${ordersFound}`}</span>
    </ViewController>
  );
}
