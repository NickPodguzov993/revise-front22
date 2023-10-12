import { getMonthDate } from "@/shared/utils";
import { ReviseFile } from ".";

export function reviseObjectsUrl(date: Date) {
  // `/api/revise-object?date=${getMonthDate(date)}`;
  return `/api/${getMonthDate(date)}`;
}

export async function uploadReviseFile(
  fileId: ReviseFile["id"],
  file: ArrayBuffer
) {
  const data = new FormData();
  data.append("file", new Blob([file]));
  return fetch(`/api/revise-object/${fileId}`, {
    method: "POST",
    body: data,
  });
}

export async function deleteReviseFile(fileId: ReviseFile["id"]) {
  return fetch(`/api/revise-object/${fileId}`, {
    method: "DELETE",
  });
}
