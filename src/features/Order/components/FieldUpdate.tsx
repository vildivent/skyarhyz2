"use client";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useEffect, useState } from "react";
import IconButton from "~/shared/ui/IconButton";
import useUpdateField from "../lib/useUpdateField";
import Loading from "./Loading";
import type {
  OrderUpdateByAdminInput,
  OrderUpdateByUserInput,
} from "~/trpc/shared";

type FieldUpdateProps = {
  defaultView: ReactNode;
  children: ReactNode;
  setError: Dispatch<SetStateAction<string>>;
  reset?: boolean;
  editable?: boolean;
  onSuccess?: (() => void) | (() => Promise<void>);
  errorName?: string;
} & (
  | { type: "user"; data: OrderUpdateByUserInput }
  | { type: "admin"; data: OrderUpdateByAdminInput }
);
export default function FieldUpdate({
  defaultView,
  children,
  type,
  data,
  reset = false,
  setError,
  editable = true,
  onSuccess,
  errorName,
}: FieldUpdateProps) {
  if (!editable) return defaultView;
  const [isEditing, setIsEditing] = useState(false);
  const { update, isLoading } = useUpdateField({
    type,
    data,
    setError,
    setIsEditing,
    errorName,
    onSuccess,
  });

  useEffect(() => {
    setIsEditing(false);
  }, [reset]);

  if (isEditing)
    return (
      <>
        {children}
        {isLoading ? (
          <Loading />
        ) : (
          <IconButton btntype="check" onClick={() => update()} />
        )}
      </>
    );
  return (
    <>
      {defaultView}
      <IconButton btntype="edit" onClick={() => setIsEditing(true)} />
    </>
  );
}
