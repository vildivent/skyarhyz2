import type { UseFormSetError } from "react-hook-form";
import { api } from "~/trpc/react";
import type { OrderCreateForm } from "../validation";

type SubmitUserConfig = {
  setError: UseFormSetError<OrderCreateForm>;
  onSuccess?: (() => void) | (() => Promise<void>);
  onError?: (() => void) | (() => Promise<void>);
};
export default function useOrderCreate({
  setError,
  onSuccess,
  onError,
}: SubmitUserConfig) {
  const ctx = api.useUtils();
  const {
    mutate: create,
    isLoading,
    isSuccess,
  } = api.order.create.useMutation({
    onSuccess: async () => {
      await ctx.notification.getNewAmount.invalidate();
      if (onSuccess) await onSuccess();
    },
    onError: async (error) => {
      const serverErrorMessage =
        "Произошла ошибка создания заявки. Попробуйте снова или обратитесь к администратору.";
      const invalidPromododeMessage = "Недействительный промокод";
      if (error.message.includes("invalid promocode"))
        setError("promocode", { message: invalidPromododeMessage });
      else setError("root", { message: serverErrorMessage });
      if (onError) await onError();
    },
  });
  return { create, isLoading, isSuccess };
}
