"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { FiPhone } from "react-icons/fi";
import FieldView from "~/components/FieldView";
import { phoneNumberLengthFormatted } from "~/shared/constants";
import { PhoneNumberInput } from "~/shared/ui/inputs";
import {
  formatPhoneNumber,
  parsePhoneNumber,
} from "~/shared/utils/phoneNumber";
import useSetSearchParams from "../lib/hooks/useSetSearchParams";

export default function PhoneNumberField() {
  const size = 20;
  const routerReplace = useSetSearchParams();
  const params = useSearchParams();
  const tel = params.get("tel") ?? "";
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.value = tel && formatPhoneNumber(tel);
  }, [tel]);

  function setPhoneNamber(phoneNumber: string) {
    if (phoneNumber.length === phoneNumberLengthFormatted)
      routerReplace({ tel: parsePhoneNumber(phoneNumber) });
    else routerReplace({ tel: "" });
  }

  return (
    <FieldView
      id="filter-phoneNumber"
      icon={<FiPhone size={size} />}
      tooltip="Фильтр по номеру телефона"
    >
      <PhoneNumberInput
        ref={ref}
        defaultValue={tel && formatPhoneNumber(tel)}
        onChange={(e) => setPhoneNamber(e.target.value)}
      />
    </FieldView>
  );
}
