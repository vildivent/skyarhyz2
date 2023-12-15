"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { GoPerson } from "react-icons/go";
import FieldView from "~/components/FieldView";
import { GroupSizeInput } from "~/shared/ui/inputs";
import useSetSearchParams from "../lib/hooks/useSetSearchParams";

export default function GroupSizeField() {
  const size = 20;
  const routerReplace = useSetSearchParams();
  const params = useSearchParams();
  const gsf = params.get("gsf") ?? "";
  const gst = params.get("gst") ?? "";
  const refFrom = useRef<HTMLInputElement>(null);
  const refTo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (refFrom.current) refFrom.current.value = gsf;
  }, [gsf]);

  useEffect(() => {
    if (refTo.current) refTo.current.value = gst;
  }, [gst]);

  return (
    <FieldView
      id="filter-groupSize"
      icon={<GoPerson size={size} />}
      tooltip="Фильтр по размеру группы"
    >
      <div className="flex items-center gap-2">
        <GroupSizeInput
          ref={refFrom}
          name="groupSizeFrom"
          placeholder="от"
          defaultValue={gsf}
          onChange={(e) => routerReplace({ gsf: e.target.value })}
        />
        <span>-</span>
        <GroupSizeInput
          ref={refTo}
          name="groupSizeTo"
          placeholder="до"
          defaultValue={gst}
          onChange={(e) => routerReplace({ gst: e.target.value })}
        />
      </div>
    </FieldView>
  );
}
