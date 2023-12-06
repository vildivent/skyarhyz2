"use client";
import { ExcursionStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import IconWithTooltip from "~/components/IconWithTooltip";
import FormError from "~/shared/ui/FormError";
import { SelectInput } from "~/shared/ui/inputs";
import { api } from "~/trpc/react";
import { orderExcursionStatusMapper } from "../../lib/helpers";
import Edit from "../Edit";

type ExcursionStatusBlockProps = {
  id: string;
  currentExcursionStatus: ExcursionStatus | null;
};
export default function ExcursionStatusBlockAdmin({
  id,
  currentExcursionStatus,
}: ExcursionStatusBlockProps) {
  const size = 23;
  const query = {};
  const router = useRouter();
  const ctx = api.useUtils();
  const {
    mutate: update,
    isLoading,
    isError,
  } = api.order.updateByAdmin.useMutation({
    onSuccess: async () => {
      await ctx.order.getByAdmin.invalidate(query);
      //   await ctx.excursion.invalidate();
      router.refresh();
    },
  });

  const [excursionStatus, setExcursionStatus] = useState(
    currentExcursionStatus,
  );
  const [isEditing, setIsEditing] = useState(false);

  function submitHandler() {
    update({ id, excursionStatus });
  }

  return (
    <div className="flex flex-col">
      <div className="my-2 flex items-center gap-2">
        <IconWithTooltip
          id={"admin-excursionStatus-" + id}
          icon={<HiOutlineDocumentCheck size={size} />}
          tooltip="Статус записи на экскурсию"
        />
        <Edit
          defaultView={<DefaultView excursionStatus={excursionStatus} />}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          submit={submitHandler}
          isLoading={isLoading}
          editable
        >
          <EditView
            excursionStatus={excursionStatus}
            setExcursionStatus={setExcursionStatus}
          />
        </Edit>
        <FormError error={isError ? "Не удалось обновить" : ""} iconMargin />
      </div>
    </div>
  );
}

function DefaultView({
  excursionStatus,
}: {
  excursionStatus: ExcursionStatus | null;
}) {
  return (
    <span className="my-auto ml-5 overflow-hidden text-ellipsis">
      {excursionStatus}
    </span>
  );
}

type EditViewProps = {
  excursionStatus: ExcursionStatus | null;
  setExcursionStatus: Dispatch<SetStateAction<ExcursionStatus | null>>;
};
function EditView({ excursionStatus, setExcursionStatus }: EditViewProps) {
  return (
    <SelectInput
      name="excursionStatus"
      value={excursionStatus ?? ""}
      onChange={(e) =>
        setExcursionStatus(
          e.target.value === "" ? null : (e.target.value as ExcursionStatus),
        )
      }
    >
      {Object.values(ExcursionStatus).map((excursionStatus) => (
        <option key={excursionStatus} value={excursionStatus}>
          {orderExcursionStatusMapper(excursionStatus)}
        </option>
      ))}
      <option value="">-</option>
    </SelectInput>
  );
}
