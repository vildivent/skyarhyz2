"use client";
import IconButton from "~/shared/ui/IconButton";
import useSetSearchParams from "../lib/hooks/useSetSearchParams";
import { useState } from "react";

export default function OrdersSort({
  sort: sortDefault,
}: {
  sort: "asc" | "desc";
}) {
  const [sort, setSort] = useState(sortDefault);
  const routerReplace = useSetSearchParams();
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
