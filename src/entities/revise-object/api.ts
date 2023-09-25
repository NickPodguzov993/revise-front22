import { getMonthDate } from "@/shared/utils";

export function reviseObjectsUrl(date: Date) {
  return `/api/revise-objects?date=${getMonthDate(date)}`;
}

export function uploadReviseFile() {}
export function deleteReviseFile() {}
