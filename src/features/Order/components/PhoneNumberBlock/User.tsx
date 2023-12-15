"use client";
import { useEffect, useMemo, useState } from "react";
import { FiPhone } from "react-icons/fi";
import FieldView from "~/components/FieldView";
import { PhoneNumberInput } from "~/shared/ui/inputs";
import {
  formatPhoneNumber,
  parsePhoneNumber,
} from "~/shared/utils/phoneNumber";
import FieldUpdate from "../FieldUpdate";

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
  const [error, setError] = useState("");
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setReset((prev) => !prev);
    setError("");
    setPhoneNumber(formattedPhoneNumber);
  }, [editable, formattedPhoneNumber]);

  return (
    <FieldView
      id={"phoneNumber-" + id}
      icon={<FiPhone size={size} />}
      tooltip="Номер телефона"
      error={error}
    >
      <FieldUpdate
        type="user"
        data={{ id, phoneNumber: parsePhoneNumber(phoneNumber) }}
        defaultView={<DefaultView phoneNumber={phoneNumber} />}
        setError={setError}
        editable={editable}
        errorName="phoneNumber"
        reset={reset}
      >
        <PhoneNumberInput
          placeholder="+7"
          value={phoneNumber}
          onChange={(e) => {
            setError("");
            setPhoneNumber(e.target.value);
          }}
        />
      </FieldUpdate>
    </FieldView>
  );
}

function DefaultView({ phoneNumber }: { phoneNumber: string }) {
  return <span className="ml-5">{phoneNumber}</span>;
}
