import type { DetailedHTMLProps, LabelHTMLAttributes, ReactNode } from "react";

type LabelProps = {
  label: string;
  children: ReactNode;
} & DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
export default function Label({ label, children, ...props }: LabelProps) {
  return (
    <div className="flex flex-col">
      <label className="ml-4 mr-auto opacity-70" {...props}>
        {label}
      </label>
      {children}
    </div>
  );
}
