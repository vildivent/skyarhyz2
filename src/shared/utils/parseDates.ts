import { DateObject } from "react-multi-date-picker";

export default function parseDates(input?: string | null) {
  if (!input) return null;
  const regex = /(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}/g; //DD.MM.YYYY
  const dates = input.match(regex);
  if (!dates) return null;
  return dates.map((date) =>
    new DateObject({ format: "DD.MM.YYYY", date }).toDate(),
  );
}
