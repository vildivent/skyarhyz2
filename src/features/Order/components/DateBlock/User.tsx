"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import IconWithTooltip from "~/components/IconWithTooltip";
import { CalendarWidget, DatePickerWidget } from "~/features/DatePicker";
import FormError from "~/shared/ui/FormError";
import { dateToString } from "~/shared/utils/formatDate";
import { api } from "~/trpc/react";
import Edit from "../Edit";

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
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { mutate: update, isLoading } = api.order.updateByUser.useMutation({
    onSuccess: async () => {
      router.refresh();
      setIsEditing(false);
    },
    onError: () => {
      setError("Не удалось обновить!");
    },
  });
  const setDatesHandler = (dateFrom: Date | null, dateTo: Date | null) => {
    setError("");
    setDates({ dateFrom, dateTo });
  };
  const submitHandler = () => {
    if (!dates.dateFrom || !dates.dateTo) return setError("Выберите даты");
    update({
      id,
      dateFrom: dates.dateFrom,
      dateTo: dates.dateTo,
    });
  };

  useEffect(() => {
    setIsEditing(false);
    setError("");
    setDates({ dateFrom, dateTo });
  }, [editable, dateFrom.toDateString(), dateTo.toDateString()]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <IconWithTooltip
          id={"dates" + id}
          icon={<IoCalendarOutline size={size} />}
          tooltip="Даты заявки"
        />
        <Edit
          defaultView={
            <DefaultView dateFrom={dates.dateFrom} dateTo={dates.dateTo} />
          }
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          submit={submitHandler}
          isLoading={isLoading}
          editable={editable}
        >
          <DatePickerWidget
            dateFrom={dates.dateFrom}
            dateTo={dates.dateTo}
            setDates={setDatesHandler}
          />
        </Edit>
      </div>
      <FormError error={error} iconMargin />
      <div className="z-0 -mt-2 mb-4 flex justify-center">
        <CalendarWidget dateRange={[dateFrom, dateTo]} />
      </div>
    </div>
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
