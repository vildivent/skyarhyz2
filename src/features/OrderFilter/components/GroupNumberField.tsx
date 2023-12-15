"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { GoPeople } from "react-icons/go";
import FieldView from "~/components/FieldView";
import { GroupNumberInput } from "~/shared/ui/inputs";
import useSetSearchParams from "../lib/hooks/useSetSearchParams";

export default function GroupNumberField() {
  const size = 20;
  const excursionMode = false;
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
