import { getMonthDate } from "@/shared/utils";
import { CreateSystemDTO, DuplicateSystemsDTO, UpdateSystemDTO } from "./dto";

export function paymentsSystemUrl(date: Date) {
  return `/api/payments-system?date=${getMonthDate(date)}`;
}

export async function createPaymentsSystem(payload: CreateSystemDTO) {
  return fetch("/api/payments-system", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updatePaymentsSystem(
  id: number,
  payload: UpdateSystemDTO
) {
  return fetch(`/api/payments-system/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deletePaymentsSystem(id: number) {
  return fetch(`/api/payments-system/${id}`, {
    method: "DELETE",
  });
}

export async function duplicatePaymentsSystems(payload: DuplicateSystemsDTO) {
  return fetch("/api/payments-system/duplicate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
