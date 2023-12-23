"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { GoPeople } from "react-icons/go";
import FieldView from "~/components/FieldView";
import { useExcursionMenuStore } from "~/features/Excursion/lib/store";
import { GroupNumberInput } from "~/shared/ui/inputs";
import useSetSearchParams from "~/shared/utils/hooks/useSetSearchParams";

export default function GroupNumberField() {
  const size = 20;
  const excursionMode = useExcursionMenuStore((state) => state.isOpen);
  const routerReplace = useSetSearchParams();
  const params = useSearchParams();
  const group = params.get("group") ?? "";
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.value = group;
  }, [group]);

  return (
    <FieldView
      id="filter-group"
      icon={<GoPeople size={size} />}
      tooltip="Фильтр по номеру группы"
    >
      <GroupNumberInput
        ref={ref}
        name="groupNumber"
        defaultValue={group}
        onChange={(e) => routerReplace({ group: e.target.value })}
        disabled={excursionMode}
      />
    </FieldView>
  );
}
