"use client";
import { format, parse } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import FieldView from "~/components/FieldView";
import { DatePickerWidget } from "~/features/DatePicker";
import useSetSearchParams from "../lib/hooks/useSetSearchParams";

export default function DatesField() {
  const size = 20;
  const excursionMode = false;
  const params = useSearchParams();
  const routerReplace = useSetSearchParams();

  const dateFrom = useMemo(() => {
    const df = params.get("df") ?? "";
    return parse(df, "d.M.y", new Date());
  }, [params]);

  const dateTo = useMemo(() => {
    const dt = params.get("dt") ?? "";
    return parse(dt, "d.M.y", new Date());
  }, [params]);

  function setDates(dateFrom: Date | null, dateTo: Date | null) {
    const df = dateFrom ? format(dateFrom, "d.M.y") : "";
    const dt = dateTo ? format(dateTo, "d.M.y") : "";
    routerReplace({ df, dt });
  }

  return (
    <FieldView
      id="filter-dates"
      icon={<IoCalendarOutline size={size} />}
      tooltip="Фильтр по датам (пересечение диапазонов)"
    >
      <DatePickerWidget
        dateFrom={dateFrom}
        dateTo={dateTo}
        setDates={setDates}
        disabled={excursionMode}
        minMaxOff
      />
    </FieldView>
  );
}
