"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import FieldView from "~/components/FieldView";
import { TextInput } from "~/shared/ui/inputs";
import useSetSearchParams from "~/shared/utils/hooks/useSetSearchParams";

export default function QueryField() {
  const size = 20;
  const routerReplace = useSetSearchParams();
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.value = q;
  }, [q]);

  return (
    <FieldView
      id="filter-name"
      icon={<AiOutlineSearch size={size} />}
      tooltip="Поиск с частичным совпадением"
    >
      <TextInput
        ref={ref}
        name="search"
        placeholder="Поиск"
        defaultValue={q}
        onChange={(e) => routerReplace({ q: e.target.value })}
      />
    </FieldView>
  );
}
