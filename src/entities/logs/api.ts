import { LogsFormValues } from "./form";

export async function reviseLogs({
  userId,
  date,
  sum,
  fileLog,
  fileMarbella,
}: LogsFormValues) {
  const payload = new FormData();
  const query = new URLSearchParams({
    user_id: userId,
    date,
    sum,
  });
  const log = await fileLog.arrayBuffer();
  const marbella = await fileMarbella.arrayBuffer();
  payload.append("file_log", new Blob([log]), fileLog.name);
  payload.append("file_marbella", new Blob([marbella]), fileMarbella.name);

  return fetch("/api/marbella?" + query.toString(), {
    method: "POST",
    body: payload,
  });
}
