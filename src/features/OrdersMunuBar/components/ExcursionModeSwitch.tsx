"use client";
import { format } from "date-fns";
import { useExcursionMenuStore } from "~/features/Excursion/lib/store";
import IconButton from "~/shared/ui/IconButton";
import useSetSearchParams from "~/shared/utils/hooks/useSetSearchParams";

export default function ExcursionModeSwitch() {
  const { isOpen, setIsOpen } = useExcursionMenuStore();
  const routerReplace = useSetSearchParams();
  return (
    <IconButton
      btntype="excursionMode"
      onClick={() => {
        setIsOpen(!isOpen);
        if (isOpen)
          routerReplace({
            status: "registered",
            df: "",
            dt: "",
            group: "",
            sort: "",
          });
        else
          routerReplace({
            status: "active",
            df: format(new Date(), "d.M.y"),
            dt: format(new Date(), "d.M.y"),
            group: "0",
            sort: "asc",
          });
      }}
    />
  );
}
