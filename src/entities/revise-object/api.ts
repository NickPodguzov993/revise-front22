import { getShortDate } from "./utils";

export function reviseObjectsUrl(date: Date) {
  return `/api/revise-objects?date=${getShortDate(date)}`;
}

export function uploadReviseFile() {}
export function deleteReviseFile() {}
