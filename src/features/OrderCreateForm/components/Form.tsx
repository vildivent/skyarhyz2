"use client";
import Link from "next/link";
import { DatePickerWidget } from "~/features/DatePicker";
import Button from "~/shared/ui/Button";
import FormError from "~/shared/ui/FormError";
import Label from "~/shared/ui/Label";
import {
  GroupSizeInput,
  PhoneNumberInput,
  TextAreaInput,
  TextInput,
} from "~/shared/ui/inputs";
import { limitMask } from "~/shared/utils/inputMasks";
import type { UserForOrder } from "~/trpc/shared";
import { useOrderCreateForm } from "../lib/hooks/useOrderCreateForm";
import DatesInfoModal from "./DatesInfoModal";
import Spinner from "~/shared/ui/Skeleton/Spinner";

type FormProps = {
  user: UserForOrder;
  datesInfo: React.ReactNode;
};
export default function Form({ user, datesInfo }: FormProps) {
  const {
    register,
    onSubmit,
    getValues,
    setDatesHandler,
    isSubmitting,
    errors,
  } = useOrderCreateForm({ user });
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <Label htmlFor="name" label="Имя">
        <TextInput
          {...register("name")}
          id="name"
          mask={(input) => limitMask(input, 30)}
        />
        <FormError error={errors.name?.message} />
      </Label>
      <Label htmlFor="tel" label="Контактный номер телефона">
        <PhoneNumberInput {...register("phoneNumber")} id="tel" />
        <FormError error={errors.phoneNumber?.message} />
      </Label>
      <Label htmlFor="groupSize" label="Размер группы (чел.)">
        <GroupSizeInput
          {...register("groupSize")}
          id="groupSize"
          className="mr-auto"
        />
        <FormError error={errors.groupSize?.message} />
      </Label>
      <Label htmlFor="dates" label="Даты экскурсии">
        <div id="dates" className="flex items-center gap-2">
          <DatePickerWidget
            dateFrom={getValues().dateFrom}
            dateTo={getValues().dateTo}
            setDates={setDatesHandler}
          />
          <DatesInfoModal datesInfo={datesInfo} />
        </div>
        <FormError error={errors.dateFrom?.message ?? errors.dateTo?.message} />
      </Label>
      <Label htmlFor="comment" label="Комментарий (необязательно)">
        <TextAreaInput {...register("comment")} id="comment" />
        <FormError error={errors.comment?.message} />
      </Label>
      <FormError error={errors.root?.message} />

      <div className="mt-3 grid grid-cols-2 gap-2 self-center">
        {isSubmitting ? (
          <div className="mx-auto my-auto">
            <Spinner />
          </div>
        ) : (
          <Button type="submit">Подтвердить</Button>
        )}
        <Link href="/">
          <Button color="gray" className="!w-full">
            Отмена
          </Button>
        </Link>
      </div>
    </form>
  );
}
