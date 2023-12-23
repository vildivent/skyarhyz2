"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import IconButton from "~/shared/ui/IconButton";
import useSetSearchParams from "~/shared/utils/hooks/useSetSearchParams";

export default function OrdersSort() {
  const routerReplace = useSetSearchParams();
  const params = useSearchParams();
  const sortParam = params.get("sort") ?? "desc";
  const [sort, setSort] = useState(sortParam);
  useEffect(() => {
    setSort(sortParam);
  }, [sortParam]);

  if (sort === "asc")
    return (
      <IconButton
        btntype="sortUp"
        aria-label="Сортировка по возрастанию"
        onClick={() => {
          routerReplace({ sort: "" });
          setSort("desc");
        }}
      />
    );
  if (sort === "desc")
    return (
      <IconButton
        btntype="sortDown"
        aria-label="Сортировка по убыванию"
        onClick={() => {
          routerReplace({ sort: "asc" });
          setSort("asc");
        }}
      />
    );
}
