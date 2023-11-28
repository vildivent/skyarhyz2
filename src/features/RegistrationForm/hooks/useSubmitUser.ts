import type { UseFormSetError } from "react-hook-form";
import { api } from "~/trpc/react";
import type { UserSubmit } from "~/trpc/shared";

type SubmitUserConfig = {
  setError: UseFormSetError<UserSubmit>;
  onSuccess?: (() => void) | (() => Promise<void>);
  onError?: (() => void) | (() => Promise<void>);
};
export default function useSubmitUser({
  setError,
  onSuccess,
  onError,
}: SubmitUserConfig) {
  const { mutate: submit, isLoading } = api.user.submit.useMutation({
    onSuccess: async () => {
      if (onSuccess) await onSuccess();
    },
    onError: async (error) => {
      const serverErrorMessage =
        "Произошла ошибка регистрации. Попробуйте снова или обратитесь к администратору.";
      const fields = ["name", "lastName", "phone"] as const;
      fields.forEach((field) => {
        const message = error?.data?.zodError?.fieldErrors[field]?.at(0);
        setError(field, { message });
      });
      setError("root", { message: serverErrorMessage });
      if (onError) await onError();
    },
  });
  return { submit, isLoading };
}
