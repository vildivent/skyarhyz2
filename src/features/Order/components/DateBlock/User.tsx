"use client";
import { useEffect, useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { CalendarWidget, DatePickerWidget } from "~/features/DatePicker";
import { dateToString } from "~/shared/utils/formatDate";
import FieldUpdate from "../FieldUpdate";
import FieldView from "../FieldView";

type DateBlockProps = {
  id: string;
  dateFrom: Date;
  dateTo: Date;
  editable?: boolean;
};
export default function DateBlockUser({
  id,
  dateFrom,
  dateTo,
  editable = false,
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
        id={"dates-" + id}
        icon={<IoCalendarOutline size={size} />}
        tooltip="Даты заявки"
        error={error}
      >
        <FieldUpdate
          type="user"
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
  const stringFrom = dateFrom ? dateToString(dateFrom) : "";
  const stringTo = dateTo ? " - " + dateToString(dateTo) : "";
  return <span className="ml-5">{stringFrom + stringTo}</span>;
}
