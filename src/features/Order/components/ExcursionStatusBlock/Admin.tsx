"use client";
import { ExcursionStatus } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import FieldView from "~/components/FieldView";
import { SelectInput } from "~/shared/ui/inputs";
import { orderExcursionStatusMapper } from "../../lib/helpers";
import FieldUpdate from "../FieldUpdate";

type ExcursionStatusBlockProps = {
  id: string;
  currentExcursionStatus: ExcursionStatus | null;
  editable?: boolean;
};
export default function ExcursionStatusBlockAdmin({
  id,
  currentExcursionStatus,
  editable = true,
}: ExcursionStatusBlockProps) {
  const size = 23;
  const [excursionStatus, setExcursionStatus] = useState(
    currentExcursionStatus,
  );
  const [error, setError] = useState("");
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setReset((prev) => !prev);
    setError("");
    setExcursionStatus(currentExcursionStatus);
  }, [editable, currentExcursionStatus]);

  return (
    <FieldView
      id={"admin-excursionStatus-" + id}
      icon={<HiOutlineDocumentCheck size={size} />}
      tooltip="Статус записи на экскурсию"
      error={error}
    >
      <FieldUpdate
        type="admin"
        data={{ id, excursionStatus }}
        defaultView={<DefaultView excursionStatus={excursionStatus} />}
        setError={setError}
        editable={editable}
        errorName="excursionStatus"
        reset={reset}
      >
        <EditView
          excursionStatus={excursionStatus}
          setExcursionStatus={setExcursionStatus}
        />
      </FieldUpdate>
    </FieldView>
  );
}

function DefaultView({
  excursionStatus,
}: {
  excursionStatus: ExcursionStatus | null;
}) {
  return (
    <span className="my-auto ml-5 overflow-hidden text-ellipsis">
      {orderExcursionStatusMapper(excursionStatus)}
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
      className="grow-0"
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
