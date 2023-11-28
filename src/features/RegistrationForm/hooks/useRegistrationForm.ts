import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { ZUserSubmitForm } from "~/entities/User/validation";
import {
  formatPhoneNumber,
  parsePhoneNumber,
} from "~/shared/utils/phoneNumber";
import type { UserRegistration, UserSubmit } from "~/trpc/shared";
import useSubmitUser from "./useSubmitUser";

type useRegistrationFormProps = {
  user: NonNullable<UserRegistration>;
};
export default function useRegistrationForm({
  user,
}: useRegistrationFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<UserSubmit>({
    resolver: zodResolver(ZUserSubmitForm),
    defaultValues: {
      name: user.name ?? "",
      lastName: user.lastName,
      phone: formatPhoneNumber(user.phone ?? ""),
    },
  });
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/";

  const { submit, isLoading } = useSubmitUser({
    setError,
    onSuccess: () => {
      router.push(callbackUrl);
      router.refresh();
    },
  });

  const preSubmit = () => {
    const values = getValues();
    if (values.lastName === "") setValue("lastName", null);
  };

  const submitForm = (data: UserSubmit) => {
    submit({ ...data, phone: parsePhoneNumber(data.phone) });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    preSubmit();
    await handleSubmit(submitForm)(e);
  };

  return {
    onSubmit,
    register,
    errors,
    isSubmitting: isSubmitting || isLoading,
  };
}
