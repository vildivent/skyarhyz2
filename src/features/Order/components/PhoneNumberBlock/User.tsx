"use client";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useMemo, useState } from "react";
import { FiPhone } from "react-icons/fi";
import IconWithTooltip from "~/components/IconWithTooltip";
import FormError from "~/shared/ui/FormError";
import { PhoneNumberInput } from "~/shared/ui/inputs";
import {
  formatPhoneNumber,
  parsePhoneNumber,
} from "~/shared/utils/phoneNumber";
import { api } from "~/trpc/react";
import Edit from "../Edit";

type PhoneNumberBlockProps = {
  id: string;
  currentPhoneNumber: string;
  editable?: boolean;
};
export default function PhoneNumberBlockUser({
  id,
  currentPhoneNumber,
  editable = false,
}: PhoneNumberBlockProps) {
  const size = 20;
  const formattedPhoneNumber = useMemo(
    () => formatPhoneNumber(currentPhoneNumber),
    [currentPhoneNumber],
  );
  const [phoneNumber, setPhoneNumber] = useState(formattedPhoneNumber);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const ctx = api.useUtils();
  const { mutate: update, isLoading } = api.order.updateByUser.useMutation({
    onSuccess: async () => {
      await ctx.order.getById.invalidate({ id });
      setIsEditing(false);
    },
    onError: (error) => {
      const phoneNumberError =
        error.data?.zodError?.fieldErrors.phoneNumber?.at(0);
      if (phoneNumberError) return setError(phoneNumberError);
      setError("Не удалось обновить!");
    },
  });

  const submitHandler = () => {
    update({ id, phoneNumber: parsePhoneNumber(phoneNumber) });
  };

  useEffect(() => {
    setIsEditing(false);
    setError("");
    setPhoneNumber(formattedPhoneNumber);
  }, [editable, formattedPhoneNumber]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-10 items-center gap-2">
        <IconWithTooltip
          id={"tel-" + id}
          icon={<FiPhone size={size} />}
          tooltip="Номер телефона"
        />

        <Edit
          defaultView={<DefaultView phoneNumber={phoneNumber} />}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          submit={submitHandler}
          isLoading={isLoading}
          editable={editable}
        >
          <EditView
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            setError={setError}
          />
        </Edit>
      </div>
      <FormError error={error} />
    </div>
  );
}

function DefaultView({ phoneNumber }: { phoneNumber: string }) {
  return <span className="ml-5">{phoneNumber}</span>;
}

type EditViewProps = {
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string>>;
};
function EditView({ phoneNumber, setPhoneNumber, setError }: EditViewProps) {
  return (
    <PhoneNumberInput
      placeholder="+7"
      value={phoneNumber}
      onChange={(e) => {
        setError("");
        setPhoneNumber(e.target.value);
      }}
    />
  );
}
