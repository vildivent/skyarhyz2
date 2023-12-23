import { create } from "zustand";

type OrdersFoundState = {
  orders: number;
  setOrders: (orders: number) => void;
};
export const useOrdersFoundStore = create<OrdersFoundState>((set) => ({
  orders: 0,
  setOrders: (orders) => {
    set({ orders });
  },
}));
