"use client";
import { OrderStatus } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import FieldView from "~/components/FieldView";
import { OrderStatusIcon } from "~/shared/ui/icons";
import { SelectInput } from "~/shared/ui/inputs";
import { orderStatusMapper } from "../../lib/helpers";
import FieldUpdate from "../FieldUpdate";

type ExcursionStatusBlockProps = {
  id: string;
  currentStatus: OrderStatus;
  editable?: boolean;
};
export default function StatusBlockAdmin({
  id,
  currentStatus,
  editable = true,
}: ExcursionStatusBlockProps) {
  const size = 23;
  const [status, setStatus] = useState(currentStatus);
  const [error, setError] = useState("");
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setReset((prev) => !prev);
    setError("");
    setStatus(currentStatus);
  }, [editable, currentStatus]);

  return (
    <FieldView
      id={"admin-status-" + id}
      icon={<OrderStatusIcon width={size} height={size} />}
      tooltip="Статус заявки"
      error={error}
    >
      <FieldUpdate
        type="admin"
        data={{ id, status }}
        defaultView={<DefaultView status={status} />}
        setError={setError}
        editable={editable}
        errorName="status"
        reset={reset}
      >
        <EditView status={status} setStatus={setStatus} />
      </FieldUpdate>
    </FieldView>
  );
}

function DefaultView({ status }: { status: OrderStatus }) {
  return (
    <span className="my-auto ml-5 overflow-hidden text-ellipsis">
      {orderStatusMapper(status)}
    </span>
  );
}

type EditViewProps = {
  status: OrderStatus;
  setStatus: Dispatch<SetStateAction<OrderStatus>>;
};
function EditView({ status, setStatus }: EditViewProps) {
  return (
    <SelectInput
      name="status"
      className="grow-0"
      value={status}
      onChange={(e) => setStatus(e.target.value as OrderStatus)}
    >
      {Object.values(OrderStatus).map((status) => (
        <option key={status} value={status}>
          {orderStatusMapper(status)}
        </option>
      ))}
    </SelectInput>
  );
}
