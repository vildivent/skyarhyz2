"use client";
import { Tooltip } from "react-tooltip";

type IconWithTooltipProps = {
  id: string;
  icon: React.ReactNode;
  tooltip: string;
  className?: string;
};
export default function IconWithTooltip({
  id,
  icon,
  tooltip,
  className = "",
}: IconWithTooltipProps) {
  return (
    <>
      <div
        className={`z-0 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center ${className}`}
        data-tooltip-id={"tooltip-" + id}
        data-tooltip-content={tooltip}
      >
        {icon}
      </div>
      <Tooltip
        id={"tooltip-" + id}
        place="bottom"
        className="z-10 border !bg-darkgray !text-smoke"
        noArrow
        opacity={1}
      />
    </>
  );
}
