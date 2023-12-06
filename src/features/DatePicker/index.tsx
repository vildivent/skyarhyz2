"use client";
import { useLayoutEffect, useState } from "react";
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import ru from "~/shared/constants/calendar/locale/gregorian_ru";
import CustomButton from "./components/CustomButton";

type InputDateProps = {
  dateFrom: Date | null;
  dateTo: Date | null;
  setDates: (dateFrom: Date | null, dateTo: Date | null) => void;
  disabled?: boolean;
  minMaxOff?: boolean;
};

export const DatePickerWidget = ({
  dateFrom,
  dateTo,
  setDates,
  disabled,
  minMaxOff,
}: InputDateProps) => {
  const [dateRange, setDateRange] = useState<DateObject[] | null>(null);

  useLayoutEffect(() => {
    const dates = [];
    if (dateFrom) dates.push(new DateObject(dateFrom));
    if (dateFrom && dateTo) dates.push(new DateObject(dateTo));
    setDateRange(dates.length ? dates : null);
  }, [dateFrom, dateTo]);

  return (
    <DatePicker
      value={dateRange}
      onChange={(input: DateObject[] | null) => {
        setDateRange(input);
        if (!input) return setDates(null, null);
        setDates(input[0]?.toDate() ?? null, input[1]?.toDate() ?? null);
      }}
      range
      locale={ru}
      format="DD.MM.YYYY"
      render={(value, openCalendar) => {
        return (
          <CustomButton
            value={value}
            openCalendar={openCalendar}
            disabled={disabled}
          />
        );
      }}
      weekStartDayIndex={1}
      minDate={minMaxOff ? undefined : new DateObject()}
      maxDate={minMaxOff ? undefined : new DateObject().add(10, "month")}
      className="bg-dark blue"
      inputClass="custom-input"
      arrow={false}
      dateSeparator=" - "
      hideOnScroll
      highlightToday
    />
  );
};

type CalendarWidgetProps = {
  dateRange: Date[] | string[] | number[] | DateObject[] | null;
};
export const CalendarWidget = ({ dateRange }: CalendarWidgetProps) => {
  return (
    <Calendar
      value={dateRange}
      range
      locale={ru}
      format="DD.MM.YYYY"
      weekStartDayIndex={1}
      className="bg-dark blue"
      readOnly
      highlightToday
    />
  );
};
