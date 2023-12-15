import IconWithTooltip from "~/components/IconWithTooltip";
import FormError from "~/shared/ui/FormError";

type FieldViewProps = {
  children: React.ReactNode;
  error?: string | null;
  itemsStart?: boolean;
} & (
  | { id: never; icon: never; tooltip: never; noIcon: true }
  | { id: string; icon: React.ReactNode; tooltip: string; noIcon?: false }
);

export default function FieldView({
  children,
  error,
  itemsStart,
  noIcon,
  id,
  icon,
  tooltip,
}: FieldViewProps) {
  return (
    <div className="flex flex-col">
      <div
        className={`flex md:gap-2 ${
          itemsStart ? "items-start" : "items-center"
        }`}
      >
        {!noIcon && <IconWithTooltip icon={icon} id={id} tooltip={tooltip} />}
        {children}
      </div>
      <FormError error={error} iconMargin />
    </div>
  );
}
