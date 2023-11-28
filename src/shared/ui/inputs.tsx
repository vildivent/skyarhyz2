import { forwardRef } from "react";
import type {
  ChangeEventHandler,
  DetailedHTMLProps,
  SelectHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  FocusEventHandler,
} from "react";
import {
  groupMask,
  groupNumberMask,
  hourMask,
  minuteMask,
  phoneNumberMask,
} from "~/shared/utils/inputMasks";
import checkboxStyle from "~/styles/checkbox.module.css";

const inputStyle =
  "bg-darkgray text-smoke border focus:border-smoke/50 selection:bg-lightgray p-1 outline-none placeholder:text-smoke/50 rounded-md";

export const SelectInput = forwardRef<
  HTMLSelectElement,
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
>(function selectInput({ children, className = "", ...props }, ref) {
  return (
    <select
      ref={ref}
      className={`${inputStyle} flex-1 px-4 ${className}`}
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
  { onChange, mask = (value) => value, className = "", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={`${inputStyle} px-4 ${className}`}
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
  { onChange, mask = (value) => value, className = "", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={`${inputStyle} ${className}`}
      type="number"
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
  { onChange, mask = (value) => value, className = "", ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={`${inputStyle} h-40 w-full resize-none px-4 pr-8 ${className}`}
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
>(function checkbox({ className = "", ...props }, ref) {
  return (
    <div
      className={`${
        checkboxStyle["checkbox-wrapper-2"] ?? ""
      } flex items-center`}
    >
      <input
        ref={ref}
        type="checkbox"
        className={`${checkboxStyle.ikxBAC ?? ""} ${className}`}
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
>(function titleInput({ className = "", ...props }, ref) {
  return (
    <TextInput
      ref={ref}
      className={`font-h1 w-full px-4 text-center text-3xl ${className}`}
      name="title"
      {...props}
    />
  );
});

export const PhoneNumberInput = forwardRef<
  HTMLInputElement,
  Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "type" | "inputMode"
  >
>(function telInput({ onChange, className = "", ...props }, ref) {
  return (
    <input
      ref={ref}
      name="tel"
      className={`${inputStyle} px-4 placeholder:text-smoke ${className}`}
      type="tel"
      inputMode="tel"
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
>(function groupSizeInput({ className = "", ...props }, ref) {
  return (
    <NumberInput
      ref={ref}
      name="groupSize"
      className={`text-center ${className}`}
      max={99}
      min={1}
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
>(function groupNumberInput({ className = "", ...props }, ref) {
  return (
    <NumberInput
      ref={ref}
      name="groupNumber"
      className={`text-center ${className}`}
      max={7}
      min={0}
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
>(function hourInput({ className = "", ...props }, ref) {
  return (
    <NumberInput
      ref={ref}
      name="hour"
      className={`text-center ${className}`}
      max={23}
      min={0}
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
>(function minuteInput({ className = "", ...props }, ref) {
  return (
    <NumberInput
      ref={ref}
      name="minute"
      className={`text-center ${className}`}
      max={59}
      min={0}
      mask={minuteMask}
      onFocus={(e) => e.currentTarget.select()}
      {...props}
    />
  );
});

export const DateInput = forwardRef<
  HTMLInputElement,
  Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
      CustomDateInputProps,
    "ref"
  >
>(function dateInput(
  { openCalendar, handleValueChange, className = "", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={`${inputStyle} cursor-pointer px-4 ${className}`}
      placeholder="дд.мм.гггг - дд.мм.гггг"
      required
      onFocus={openCalendar}
      onChange={handleValueChange}
      readOnly={true}
      {...props}
    />
  );
});

type Mask = {
  mask?: (value: string) => string;
};

type CustomDateInputProps = {
  openCalendar?: FocusEventHandler<HTMLInputElement>;
  handleValueChange?: ChangeEventHandler<HTMLInputElement>;
};

// type SelectOptions = { options: string[] | number[] };
