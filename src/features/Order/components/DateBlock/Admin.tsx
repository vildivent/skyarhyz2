"use client";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import FieldView from "~/components/FieldView";
import { CalendarWidget, DatePickerWidget } from "~/features/DatePicker";
import FieldUpdate from "../FieldUpdate";

type DateBlockProps = {
  id: string;
  dateFrom: Date;
  dateTo: Date;
  editable?: boolean;
};
export default function DateBlockAdmin({
  id,
  dateFrom,
  dateTo,
  editable = true,
}: DateBlockProps) {
  const size = 20;
  const [dates, setDates] = useState<{
    dateFrom: Date | null;
    dateTo: Date | null;
  }>({
    dateFrom,
    dateTo,
  });
  const [error, setError] = useState("");
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setReset((prev) => !prev);
    setError("");
    setDates({ dateFrom, dateTo });
  }, [editable, dateFrom.toDateString(), dateTo.toDateString()]);

  const setDatesHandler = (dateFrom: Date | null, dateTo: Date | null) => {
    setError("");
    setDates({ dateFrom, dateTo });
  };

  return (
    <>
      <FieldView
        id={"admin-dates-" + id}
        icon={<IoCalendarOutline size={size} />}
        tooltip="Даты заявки"
        error={error}
      >
        <FieldUpdate
          type="admin"
          data={{
            id,
            dateFrom: dates.dateFrom,
            dateTo: dates.dateTo,
          }}
          defaultView={
            <DefaultView dateFrom={dates.dateFrom} dateTo={dates.dateTo} />
          }
          setError={setError}
          editable={editable}
          errorName="dateTo"
          reset={reset}
        >
          <DatePickerWidget
            dateFrom={dates.dateFrom}
            dateTo={dates.dateTo}
            setDates={setDatesHandler}
            minMaxOff
          />
        </FieldUpdate>
      </FieldView>
      <div className="relative z-0 mb-4 flex justify-center">
        <CalendarWidget dateRange={[dateFrom, dateTo]} />
      </div>
    </>
  );
}

type DefaultViewProps = {
  dateFrom: Date | null;
  dateTo: Date | null;
};
function DefaultView({ dateFrom, dateTo }: DefaultViewProps) {
  const stringFrom = dateFrom ? format(dateFrom, "dd.MM.y") : "";
  const stringTo = dateTo ? " - " + format(dateTo, "dd.MM.y") : "";
  return <span className="ml-5">{stringFrom + stringTo}</span>;
}
