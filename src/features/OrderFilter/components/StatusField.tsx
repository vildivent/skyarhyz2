"use client";
import { OrderStatus } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import FieldView from "~/components/FieldView";
import { useExcursionMenuStore } from "~/features/Excursion/lib/store";
import { orderStatusMapper } from "~/features/Order/lib/helpers";
import { OrderStatusIcon } from "~/shared/ui/icons";
import { SelectInput } from "~/shared/ui/inputs";
import useSetSearchParams from "~/shared/utils/hooks/useSetSearchParams";

export default function StatusField() {
  const size = 20;
  const excursionMode = useExcursionMenuStore((state) => state.isOpen);
  const routerReplace = useSetSearchParams();
  const params = useSearchParams();
  const status = params.get("status") ?? "";
  const ref = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.value = status;
  }, [status]);

  return (
    <FieldView
      id="filter-status"
      icon={<OrderStatusIcon height={size} width={size} />}
      tooltip="Фильтр по статусу заявки"
    >
      <SelectInput
        ref={ref}
        name="status"
        defaultValue={status}
        onChange={(e) => routerReplace({ status: e.target.value })}
        disabled={excursionMode}
      >
        {Object.values(OrderStatus).map((status) => (
          <option key={status} value={status}>
            {orderStatusMapper(status, true)}
          </option>
        ))}
        <option value=""> Все </option>
      </SelectInput>
    </FieldView>
  );
}
