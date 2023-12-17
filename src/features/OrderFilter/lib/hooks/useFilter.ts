import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import useSetSearchParams from "~/shared/utils/hooks/useSetSearchParams";

export default function useFilter(excursionMode?: boolean) {
  const routerReplace = useSetSearchParams();
  const reset = useCallback(
    excursionMode
      ? () =>
          routerReplace({
            q: "",
            gsf: "",
            gst: "",
            tel: "",
          })
      : () =>
          routerReplace({
            q: "",
            gsf: "",
            gst: "",
            df: "",
            dt: "",
            tel: "",
            group: "",
          }),
    [excursionMode, routerReplace],
  );

  const params = useSearchParams();

  const filterWarning = useMemo(
    excursionMode
      ? () =>
          Boolean(
            params.get("q") ??
              params.get("gsf") ??
              params.get("gst") ??
              params.get("tel"),
          )
      : () =>
          Boolean(
            params.get("q") ??
              params.get("gsf") ??
              params.get("gst") ??
              params.get("df") ??
              params.get("dt") ??
              params.get("tel") ??
              params.get("group"),
          ),
    [params, excursionMode],
  );

  return { reset, filterWarning };
}
