"use client";
import type {
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
} from "react";
import IconButton from "~/shared/ui/IconButton";
import Loading from "./Loading";

type EditProps = {
  defaultView: ReactNode;
  children: ReactNode;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  submit: MouseEventHandler<HTMLButtonElement>;
  editable: boolean;
  isLoading: boolean;
};
export default function Edit({
  defaultView,
  children,
  isEditing,
  submit,
  setIsEditing,
  editable,
  isLoading,
}: EditProps) {
  if (!editable) return defaultView;
  if (isEditing)
    return (
      <>
        {children}
        {isLoading && <Loading />}
        {!isLoading && <IconButton btntype="check" onClick={submit} />}
      </>
    );
  return (
    <>
      {defaultView}
      <IconButton btntype="edit" onClick={() => setIsEditing(true)} />
    </>
  );
}
