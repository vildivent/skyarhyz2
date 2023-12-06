import type { TRPCClientErrorLike } from "@trpc/client";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import type { AppRouter } from "~/server/api/root";
import { api } from "~/trpc/react";
import type {
  OrderUpdateByAdminInput,
  OrderUpdateByUserInput,
} from "~/trpc/shared";

type UpdateFieldParams = {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  errorName?: string;
  onSuccess?: (() => void) | (() => Promise<void>);
} & (
  | { type: "user"; data: OrderUpdateByUserInput }
  | { type: "admin"; data: OrderUpdateByAdminInput }
);
export default function useUpdateField({
  type,
  data,
  setIsEditing,
  setError,
  errorName,
  onSuccess,
}: UpdateFieldParams) {
  const router = useRouter();

  async function _onSuccess() {
    if (onSuccess) await onSuccess();
    setIsEditing(false);
    router.refresh();
  }
  function _onError(error: TRPCClientErrorLike<AppRouter>) {
    if (!errorName) return setError("Не удалось обновить!");
    const errorMessage = error.data?.zodError?.fieldErrors[errorName]?.at(0);
    if (errorMessage) return setError(errorMessage);
    setError("Не удалось обновить!");
  }

  const { mutate: updateByUser, isLoading: isLoadingUser } =
    api.order.updateByUser.useMutation({
      onSuccess: _onSuccess,
      onError: _onError,
    });

  const { mutate: updateByAdmin, isLoading: isLoadingAdmin } =
    api.order.updateByAdmin.useMutation({
      onSuccess: _onSuccess,
      onError: _onError,
    });

  if (type === "admin")
    return { update: () => updateByAdmin(data), isLoading: isLoadingAdmin };

  return { update: () => updateByUser(data), isLoading: isLoadingUser };
}
