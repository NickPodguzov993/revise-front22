import { getMonthDate } from "@/shared/utils";

function getAllSystemsMock(): Record<
  string,
  { id: number; name: string; date: string; files: { id: number }[] }[]
> {
  let saved = localStorage.getItem("payments-systems");
  if (!saved) {
    localStorage.setItem("payments-systems", "{}");
    saved = "{}";
  }
  return JSON.parse(saved);
}

export function getPaymentsSystemsByDateMock(date: string) {
  const allSystems = getAllSystemsMock();
  const systems = allSystems[date];
  return systems || [];
}

export function getPaymentsSystemsMock(date: string) {
  const systems = getAllSystemsMock();
  return systems[date] || [];
}

type CreateSystemMockDTO = {
  name: string;
  date: string;
  files: {
    idField: string;
    opType: string;
    project: string;
    date: string;
    amount: string;
    currency: string;
  }[];
};

export function createPaymentsSystemMock(payload: CreateSystemMockDTO) {
  const systems = getAllSystemsMock();
  const id = Date.now();
  const system = {
    ...payload,
    id,
    files: payload.files.map((f, idx) => ({ ...f, id: id + idx + 1 })),
  };
  const updated = {
    ...systems,
    [system.date]: [...(systems[system.date] || []), system],
  };
  localStorage.setItem("payments-systems", JSON.stringify(updated));
  return system;
}

type UpdateSystemMockDTO = {
  name: string;
  files: {
    id: string;
    opType: string;
    project: string;
    date: string;
    amount: string;
    currency: string;
  }[];
};

export function updatePaymentsSystemMock(
  id: number,
  payload: UpdateSystemMockDTO
) {
  const systems = getAllSystemsMock();
  const system = Object.values(systems)
    .flatMap((x) => x)
    .find((x) => x.id === id);
  if (!system) {
    throw new Error("Not found");
  }
  const updatedSystem = {
    ...payload,
    id,
    date: system.date,
    files: payload.files.map((f, idx) => ({ ...f, id: id + idx + 1 })),
  };
  const updated = {
    ...systems,
    [system.date]: [
      ...(systems[system.date] || []).filter((x) => x.id !== id),
      updatedSystem,
    ],
  };
  localStorage.setItem("payments-systems", JSON.stringify(updated));
  return updatedSystem;
}

export function deletePaymentsSystemMock(id: number) {
  const systems = getAllSystemsMock();
  const system = Object.values(systems)
    .flatMap((x) => x)
    .find((x) => x.id === id);
  if (!system) {
    return;
  }
  const updated = {
    ...systems,
    [system.date]: [...(systems[system.date] || []).filter((x) => x.id !== id)],
  };
  localStorage.setItem("payments-systems", JSON.stringify(updated));
}

type DuplicateSystemsMockDTO = {
  date: string;
};

export function duplicatePaymentsSystemsMock(payload: DuplicateSystemsMockDTO) {
  const systems = getAllSystemsMock();
  const date = new Date(payload.date);
  date.setMonth(date.getMonth() - 1);
  const prevDate = getMonthDate(date);
  const systemsToCopy = systems[prevDate];
  if (!systemsToCopy?.length) {
    throw new Error("No payments systems found");
  }
  const updated = {
    ...systems,
    [payload.date]: [
      ...systemsToCopy.map((s, idx1) => ({
        ...s,
        id: Date.now() + idx1,
        files: s.files.map((f, idx2) => ({
          ...f,
          id: Date.now() + idx1 * 100 + idx2,
        })),
      })),
    ],
  };
  localStorage.setItem("payments-systems", JSON.stringify(updated));
  return systemsToCopy;
}
