import { CreateSystemForm, UpdateSystemForm } from "./form";

export function paymentSystemUrl(id: number) {
  return `/api/ps/${id}`;
}

export async function createPaymentsSystem(
  date: Date,
  payload: CreateSystemForm
) {
  return fetch("/api/ps/add", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      info: {
        field_id: payload.idField || "id",
        field_type: payload.opType || "",
        field_date: payload.date || "",
        field_project: payload.project || "",
        field_sum: payload.amount || "",
        field_currency: payload.currency || "",
        // formate_datetime: "",
      },
      datafordate: {
        name: payload.name,
        count_file: payload.filesCount,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      },
    }),
  });
}

export async function updatePaymentsSystem(
  id: number,
  payload: UpdateSystemForm
) {
  return fetch(`/api/ps/${id}`, {
    method: "PUT",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      name: payload.name,
      field_id: payload.idField,
      field_type: payload.opType,
      field_date: payload.date,
      field_project: payload.project,
      field_sum: payload.amount,
      field_currency: payload.currency,
      // formate_datetime: "string",
    }),
  });
}

export async function deletePaymentsSystem(id: number) {
  return fetch(`/api/ps/${id}`, {
    method: "DELETE",
  });
}

export async function duplicatePaymentsSystems() {
  return fetch(`/api/ps/${"id"}/copy-to/${"date"}`, {
    method: "POST",
    // body: JSON.stringify(payload),
  });
}
