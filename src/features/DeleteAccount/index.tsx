"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteModal } from "~/components/Modal";
import Button from "~/shared/ui/Button";
import { api } from "~/trpc/react";

export default function DeleteAccount() {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const { mutate: deleteAccount } = api.user.delete.useMutation({
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });
  return (
    <>
      <Button color="red" className="mx-auto" onClick={() => setConfirm(true)}>
        Удалить аккаунт
      </Button>
      <DeleteModal
        title={
          <>
            <h2 className="text-center font-p text-xl">
              Вы действительно хотите удалить аккаунт?
            </h2>
            <p className="mb-5 text-center text-sm">
              Это действие нельзя будет отменить.
            </p>
          </>
        }
        isOpen={confirm}
        setIsOpen={setConfirm}
        deleteHandler={() => deleteAccount()}
      />
    </>
  );
}
