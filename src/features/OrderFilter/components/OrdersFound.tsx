"use client";

import { useOrdersFoundStore } from "../lib/store";

export default function OrdersFound() {
  const ordersFound = useOrdersFoundStore((state) => state.orders);
  return (
    <span className="text-center">{`Найдено заявок: ${ordersFound}`}</span>
  );
}
