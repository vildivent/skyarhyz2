import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import { Checkbox } from "~/shared/ui/inputs";

type PrivacyPolicyCheckboxProps = {
  checkbox: boolean;
  setCheckbox: Dispatch<SetStateAction<boolean>>;
};
export default function PrivacyPolicyCheckbox({
  checkbox,
  setCheckbox,
}: PrivacyPolicyCheckboxProps) {
  return (
    <div className="flex gap-5">
      <Checkbox
        checked={checkbox}
        onClick={() => setCheckbox((prev) => !prev)}
      />
      <p className="my-5 text-xs">
        с{" "}
        <Link href="/privacy-policy" className="text-primary underline">
          Соглашением о конфиденциальности
        </Link>{" "}
        ознакомлен(а)
      </p>
    </div>
  );
}