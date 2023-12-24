import { parse } from "date-fns";
import type { OrderGetByAdminInput } from "~/trpc/shared";
import { ZOrderGetByAdmin } from "./validation";

export default function parseSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
) {
  // valid params: "q", "status", "gsf", "gsf", "df", "dt", "tel", "group", "sort"

  const input: OrderGetByAdminInput = {};

  const q = ZOrderGetByAdmin.safeParse({ q: searchParams.q });
  if (q.success && q.data.q) input.q = q.data.q;

  const status = ZOrderGetByAdmin.safeParse({ status: searchParams.status });
  if (status.success && status.data.status) input.status = status.data.status;

  const gsf = ZOrderGetByAdmin.safeParse({
    groupSize: { from: searchParams.gsf && +searchParams.gsf },
  });
  if (gsf.success && gsf.data.groupSize?.from)
    input.groupSize = { ...input.groupSize, from: gsf.data.groupSize.from };

  const gst = ZOrderGetByAdmin.safeParse({
    groupSize: { to: searchParams.gst && +searchParams.gst },
  });
  if (gst.success && gst.data.groupSize?.to)
    input.groupSize = { ...input.groupSize, to: gst.data.groupSize.to };

  const df = ZOrderGetByAdmin.safeParse({
    dateFrom:
      searchParams.df &&
      typeof searchParams.df === "string" &&
      parse(searchParams.df, "d.M.y", new Date()),
  });
  if (df.success && df.data.dateFrom) input.dateFrom = df.data.dateFrom;

  const dt = ZOrderGetByAdmin.safeParse({
    dateTo:
      searchParams.dt &&
      typeof searchParams.dt === "string" &&
      parse(searchParams.dt, "d.M.y", new Date()),
  });
  if (dt.success && dt.data.dateTo) input.dateTo = dt.data.dateTo;

  const tel = ZOrderGetByAdmin.safeParse({ phoneNumber: searchParams.tel });
  if (tel.success && tel.data.phoneNumber)
    input.phoneNumber = tel.data.phoneNumber;

  const group = ZOrderGetByAdmin.safeParse({
    groupNumber: searchParams.group && +searchParams.group,
  });
  if (group.success && group.data.groupNumber !== undefined)
    input.groupNumber = group.data.groupNumber;

  const sort = ZOrderGetByAdmin.safeParse({ sort: searchParams.sort });
  if (sort.success && sort.data.sort) input.sort = sort.data.sort;

  return input;
}
