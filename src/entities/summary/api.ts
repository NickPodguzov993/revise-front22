import { getMonthDate } from "@/shared/utils";

export function summaryUrl(date: Date) {
  return `/api/${getMonthDate(date)}/data?page=0&size=100`;
}
