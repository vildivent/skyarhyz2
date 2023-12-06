import { BiTimeFive } from "react-icons/bi";
import IconWithTooltip from "~/components/IconWithTooltip";
import { dateTimeToString } from "~/shared/utils/formatDate";

type ExcursionDateBlockProps = {
  id: string;
  date?: Date | null;
};
export default function ExcursionDateBlockUser({
  id,
  date,
}: ExcursionDateBlockProps) {
  const size = 20;
  if (!date) return null;

  return (
    <div className="flex items-start gap-2">
      <IconWithTooltip
        id={"excursionDate-" + id}
        icon={<BiTimeFive size={size} />}
        tooltip="Дата экскурсии"
      />
      <div className="my-auto ml-5 flex flex-wrap gap-2">
        <span className="whitespace-nowrap">Дата экскурсии:</span>
        <span className="whitespace-nowrap">{dateTimeToString(date)}</span>
      </div>
    </div>
  );
}
