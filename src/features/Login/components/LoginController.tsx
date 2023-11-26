"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ButtonAuth from "~/shared/ui/ButtonAuth";
import { GoogleIcon, YandexIcon } from "~/shared/ui/icons";

export default function LoginController({
  warningMessage,
}: {
  warningMessage: React.ReactNode;
}) {
  const [warning, setWarning] = useState(false);
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? undefined;
  const error = params.get("error") ?? undefined;
  const errorMessage =
    "Произошла ошибка. Повторите попытку или попробуйте другой сервис.";
  return (
    <>
      <ButtonAuth
        text="Войти через Google"
        icon={<GoogleIcon />}
        onClick={() => void signIn("google", { callbackUrl })}
      />
      <ButtonAuth
        text="Войти через Яндекс"
        icon={<YandexIcon />}
        onClick={() => void signIn("yandex", { callbackUrl })}
      />
      {error && <span className="text-red-500">{errorMessage}</span>}
      {callbackUrl?.includes("order/create") && (
        <button
          className="underline opacity-50"
          onClick={() => setWarning(true)}
        >
          оставить заявку без авторизации
        </button>
      )}
      {warning && warningMessage}
    </>
  );
}
