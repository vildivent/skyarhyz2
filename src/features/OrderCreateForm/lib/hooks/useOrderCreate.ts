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
  const { mutate: create, isLoading } = api.order.create.useMutation({
    onSuccess: async () => {
      if (onSuccess) await onSuccess();
    },
    onError: async () => {
      const serverErrorMessage =
        "Произошла ошибка создания заявки. Попробуйте снова или обратитесь к администратору.";
      setError("root", { message: serverErrorMessage });
      if (onError) await onError();
    },
  });
  return { create, isLoading };
}
