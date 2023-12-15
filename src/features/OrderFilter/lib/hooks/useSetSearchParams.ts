import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useSetSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (input: Record<string, string>) => {
      const params = new URLSearchParams(searchParams);
      Object.keys(input).forEach((key) => {
        const value = input[key];
        if (value) params.set(key, value);
        else params.delete(key);
      });
      return params.toString();
    },
    [searchParams],
  );

  const routerReplace = useCallback(
    (input: Record<string, string>) => {
      router.replace(pathname + "?" + createQueryString(input), {
        scroll: false,
      });
    },
    [createQueryString, pathname, router],
  );

  return routerReplace;
}
