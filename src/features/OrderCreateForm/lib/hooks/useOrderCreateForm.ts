import { zodResolver } from "@hookform/resolvers/zod";
import type { FormEvent } from "react";
import { useForm } from "react-hook-form";
import {
  formatPhoneNumber,
  parsePhoneNumber,
} from "~/shared/utils/phoneNumber";
import type { UserForOrder } from "~/trpc/shared";
import { ZOrderCreateForm, type OrderCreateForm } from "../validation";
import useOrderCreate from "./useOrderCreate";
import useReferral from "./useReferral";

type useOrderCreateFormOptions = {
  user: UserForOrder;
};
export function useOrderCreateForm({ user }: useOrderCreateFormOptions) {
  const referral = useReferral();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<OrderCreateForm>({
    resolver: zodResolver(ZOrderCreateForm),
    defaultValues: {
      name: user?.name ?? "",
      phoneNumber: formatPhoneNumber(user?.phone ?? ""),
      groupSize: "",
      dateFrom: null,
      dateTo: null,
      comment: "",
      referral,
      promocode: "",
    },
  });
  const { create, isLoading, isSuccess } = useOrderCreate({ setError });

  function setDatesHandler(dateFrom: Date | null, dateTo: Date | null) {
    setValue("dateFrom", dateFrom);
    setValue("dateTo", dateTo);
    if (dateFrom) setError("dateFrom", { message: "" });
    if (dateTo) setError("dateTo", { message: "" });
  }
  const preSubmit = () => {
    const values = getValues();
    if (values.comment === "") setValue("comment", undefined);
  };
  const submitForm = (data: OrderCreateForm) => {
    if (data.dateFrom && data.dateTo)
      create({
        ...data,
        groupSize: +data.groupSize,
        dateFrom: data.dateFrom,
        dateTo: data.dateTo,
        phoneNumber: parsePhoneNumber(data.phoneNumber),
      });
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    preSubmit();
    await handleSubmit(submitForm)(e);
  };

  return {
    onSubmit,
    register,
    getValues,
    setDatesHandler,
    errors,
    isSubmitting: isSubmitting || isLoading,
    isSuccess,
  };
}
