import type {
  DetailedHTMLProps,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { forwardRef } from "react";
import {
  groupMask,
  groupNumberMask,
  hourMask,
  minuteMask,
  phoneNumberMask,
} from "~/shared/utils/inputMasks";
import checkboxStyle from "~/styles/checkbox.module.css";

const inputStyle =
  "bg-darkgray text-smoke border focus:border-smoke/50 selection:bg-lightgray w-full p-1 px-4 outline-none placeholder:text-smoke/50 rounded-md";

export const SelectInput = forwardRef<
  HTMLSelectElement,
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
>(function selectInput({ children, className, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={inputStyle + (className ? " " + className : "")}
      {...props}
    >
      {children}
    </select>
  );
});

export const TextInput = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    Mask
>(function textInput(
  { onChange, mask = (value) => value, className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={inputStyle + (className ? " " + className : "")}
      type="text"
      onChange={(e) => {
        e.target.value = mask(e.target.value);
        if (onChange) onChange(e);
      }}
      autoComplete="off"
      {...props}
    />
  );
});

export const NumberInput = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    Mask
>(function numberInput(
  { onChange, mask = (value) => value, className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={inputStyle + (className ? " " + className : "")}
      type="text"
      inputMode="numeric"
      onChange={(e) => {
        e.target.value = mask(e.target.value);
        if (onChange) onChange(e);
      }}
      autoComplete="off"
      {...props}
    />
  );
});

export const TextAreaInput = forwardRef<
  HTMLTextAreaElement,
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > &
    Mask
>(function textAreaInput(
  { onChange, mask = (value) => value, className, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={
        inputStyle +
        " h-40 w-full resize-none pr-8" +
        (className ? " " + className : "")
      }
      onChange={(e) => {
        e.target.value = mask(e.target.value);
        if (onChange) onChange(e);
      }}
      autoComplete="off"
      {...props}
    />
  );
});

export const ImageInput = forwardRef<
  HTMLInputElement,
  Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "className" | "type" | "accept"
  >
>(function fileInput({ ...props }, ref) {
  return (
    <input
      name="fileInput"
      type="file"
      accept="image/png, image/jpg, image/jpeg, image/webp"
      ref={ref}
      className="hidden"
      {...props}
    />
  );
});

export const Checkbox = forwardRef<
  HTMLInputElement,
  Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "type"
  >
>(function checkbox({ className, ...props }, ref) {
  return (
    <div
      className={
        "flex items-center " + (checkboxStyle["checkbox-wrapper-2"] ?? "")
      }
    >
      <input
        ref={ref}
        type="checkbox"
        className={
          (checkboxStyle.ikxBAC ?? "") + (className ? " " + className : "")
        }
        {...props}
      />
    </div>
  );
});

export const TitleInput = forwardRef<
  HTMLInputElement,
  Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "ref"
  >
>(function titleInput({ className, ...props }, ref) {
  return (
    <TextInput
      ref={ref}
      className={
        "text-center font-h text-3xl" + (className ? " " + className : "")
      }
      name="title"
      {...props}
    />
  );
});

export const PhoneNumberInput = forwardRef<
  HTMLInputElement,
  Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "type" | "inputMode" | "ref"
  >
>(function telInput({ onChange, ...props }, ref) {
  return (
    <TextInput
      ref={ref}
      name="tel"
      type="tel"
      inputMode="tel"
      size={18}
      onChange={(e) => {
        e.target.value = phoneNumberMask(e.target.value);
        if (onChange) onChange(e);
      }}
      autoComplete="off"
      placeholder="+7"
      {...props}
    />
  );
});

export const GroupSizeInput = forwardRef<
  HTMLInputElement,
  Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "ref"
  >
>(function groupSizeInput({ className, ...props }, ref) {
  return (
    <NumberInput
      ref={ref}
      name="groupSize"
      className={
        "!w-fit !px-1 text-center" + (className ? " " + className : "")
      }
      size={2}
      mask={groupMask}
      onFocus={(e) => e.currentTarget.select()}
      {...props}
    />
  );
});

export const GroupNumberInput = forwardRef<
  HTMLInputElement,
  Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "ref"
  >
>(function groupNumberInput({ className, ...props }, ref) {
  return (
    <NumberInput
      ref={ref}
      name="groupNumber"
      className={
        "!w-fit !px-1 text-center" + (className ? " " + className : "")
      }
      size={2}
      mask={groupNumberMask}
      onFocus={(e) => e.currentTarget.select()}
      {...props}
    />
  );
});

export const HoursInput = forwardRef<
  HTMLInputElement,
  Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "ref"
  >
>(function hourInput({ className, ...props }, ref) {
  return (
    <NumberInput
      ref={ref}
      name="hour"
      className={
        "!w-fit !px-1 text-center" + (className ? " " + className : "")
      }
      size={2}
      mask={hourMask}
      onFocus={(e) => e.currentTarget.select()}
      {...props}
    />
  );
});

export const MinutesInput = forwardRef<
  HTMLInputElement,
  Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "ref"
  >
>(function minuteInput({ className, ...props }, ref) {
  return (
    <NumberInput
      ref={ref}
      name="minute"
      className={
        "!w-fit !px-1 text-center" + (className ? " " + className : "")
      }
      size={2}
      mask={minuteMask}
      onFocus={(e) => e.currentTarget.select()}
      {...props}
    />
  );
});

type Mask = {
  mask?: (value: string) => string;
};
