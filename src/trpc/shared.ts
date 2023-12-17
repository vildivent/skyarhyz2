import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

import { type AppRouter } from "~/server/api/root";

export const transformer = superjson;

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getUrl() {
  return getBaseUrl() + "/api/trpc";
}

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

export type UserSubmit = RouterInputs["user"]["submit"];

export type OrderGetByAdminInput = RouterInputs["order"]["getByAdmin"];
export type OrderUpdateByAdminInput = RouterInputs["order"]["updateByAdmin"];
export type OrderUpdateByUserInput = RouterInputs["order"]["updateByUser"];
/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export type UserRegistration = RouterOutputs["user"]["registration"];
export type UserForOrder = RouterOutputs["user"]["forOrder"];

export type OrderGetByAdminOutput = RouterOutputs["order"]["getByAdmin"];
export type OrderGetByUserOutput = RouterOutputs["order"]["getByUser"];
export type OrderAdmin = ArrayElement<OrderGetByAdminOutput>;
export type OrderUser = ArrayElement<OrderGetByUserOutput>;

export type Excursion = RouterOutputs["excursion"]["get"];
