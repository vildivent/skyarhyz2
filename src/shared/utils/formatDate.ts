import { DateObject } from "react-multi-date-picker";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const dateToString = (date: Date) =>
  format(date, "d MMMM y", { locale: ru });
export const timeToString = (date: Date) =>
  new DateObject(date).format("HH:mm");
export const dateTimeToString = (date: Date) =>
  new DateObject(date).format("DD.MM.YYYY HH:mm");
export const stringToDate = (date: string) =>
  new DateObject({ date, format: "DD.MM.YYYY" }).toDate();
export const stringToTime = (time: string, nextDay?: boolean) => {
  const date = new DateObject({
    date: dateToString(new Date()) + " " + time,
    format: "DD.MM.YYYY HH:mm",
  });
  if (nextDay) date.add(1, "day");
  return date.toDate();
};
export const stringToDateTime = (date: string) =>
  new DateObject({ date, format: "DD.MM.YYYY HH:mm" }).toDate();
export const groupTime = (time: string, date: Date) =>
  new DateObject({
    date: dateToString(date) + " " + time,
    format: "DD.MM.YYYY HH:mm",
  }).toDate();
export const groupTimeNextDay = (time: string, date: Date) =>
  new DateObject({
    date: dateToString(date) + " " + time,
    format: "DD.MM.YYYY HH:mm",
  })
    .add(1, "day")
    .toDate();
export const dateClearTime = (date: Date) =>
  new DateObject(date)
    .setHour(0)
    .setMinute(0)
    .setSecond(0)
    .setMillisecond(0)
    .toDate();
