import { dateToString } from "~/shared/utils/formatDate";

export default function TimestampBlock({ timestamp }: { timestamp: Date }) {
  return <span className="ml-3">Заявка от {dateToString(timestamp)} г.</span>;
}
