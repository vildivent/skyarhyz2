type CustomButtonProps = {
  value: string | string[];
  openCalendar: () => void;
  disabled?: boolean;
};
export default function CustomButton({
  value,
  openCalendar,
  disabled,
}: CustomButtonProps) {
  return (
    <button
      type="button"
      className={`flex h-[34px] w-[231px] items-center rounded-md border bg-darkgray px-4 text-start ${
        !value || disabled ? "text-smoke/50" : ""
      }`}
      onClick={openCalendar}
      disabled={disabled}
    >
      {typeof value === "string"
        ? value
        : `${value[0]}${value[1] ? ` - ${value[1]}` : ""}` ||
          "дд.мм.гггг - дд.мм.гггг"}
    </button>
  );
}
