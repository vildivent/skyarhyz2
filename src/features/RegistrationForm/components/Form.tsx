"use client";
import { useState } from "react";
import Button from "~/shared/ui/Button";
import FormError from "~/shared/ui/FormError";
import Label from "~/shared/ui/Label";
import Spinner from "~/shared/ui/Skeleton/Spinner";
import { PhoneNumberInput, TextInput } from "~/shared/ui/inputs";
import { limitMask } from "~/shared/utils/inputMasks";
import type { UserRegistration } from "~/trpc/shared";
import useRegistrationForm from "../hooks/useRegistrationForm";
import NotificationsStatus from "./NotificationsStatus";
import PrivacyPolicyCheckbox from "./PrivacyPolicyCheckbox";

type FormProps = {
  user: NonNullable<UserRegistration>;
};
export default function Form({ user }: FormProps) {
  const { onSubmit, register, errors, isSubmitting } = useRegistrationForm({
    user,
  });
  const [checkbox, setCheckbox] = useState(false);
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <Label htmlFor="name" label="Имя">
        <TextInput
          {...register("name")}
          id="name"
          mask={(input: string) => limitMask(input, 30)}
        />
        <FormError error={errors.name?.message} />
      </Label>
      <Label htmlFor="lastName" label="Фамилия (необязательно)">
        <TextInput
          {...register("lastName")}
          id="lastName"
          mask={(input: string) => limitMask(input, 30)}
        />
        <FormError error={errors.lastName?.message} />
      </Label>
      <Label htmlFor="tel" label="Контактный телефон">
        <PhoneNumberInput id="tel" {...register("phone")} />
        <FormError error={errors.phone?.message} />
      </Label>
      <p className="ml-4">
        Уведомления{" "}
        <span className="whitespace-nowrap">
          (рекомендуем подключить Телеграм)
        </span>
      </p>
      <NotificationsStatus
        telegram={user.telegramEnabled}
        whatsapp={user.whatsappEnabled}
      />
      <PrivacyPolicyCheckbox checkbox={checkbox} setCheckbox={setCheckbox} />
      <FormError error={errors.root?.message} />
      {isSubmitting ? (
        <div className="flex h-10 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <Button
          type="submit"
          disabled={!checkbox || isSubmitting}
          className="mx-auto"
        >
          Подтвердить
        </Button>
      )}
    </form>
  );
}
