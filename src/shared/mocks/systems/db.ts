function getAllSystems(): Record<
  string,
  { id: number; name: string; date: string; files: object[] }[]
> {
  let saved = localStorage.getItem("payments-systems");
  if (!saved) {
    localStorage.setItem("payments-systems", "{}");
    saved = "{}";
  }
  return JSON.parse(saved);
}

export function getPaymentsSystemsMock(date: string) {
  const systems = getAllSystems();
  return systems[date] || [];
}

type CreateSystemMockDTO = {
  name: string;
  date: string;
  files: {
    id: string;
    opType: string;
    project: string;
    date: string;
    sum: string;
    currency: string;
  }[];
};

export function createPaymentsSystemMock(payload: CreateSystemMockDTO) {
  const systems = getAllSystems();
  const system = { ...payload, id: Date.now() };
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
    sum: string;
    currency: string;
  }[];
};

export function updatePaymentsSystemMock(
  id: number,
  payload: UpdateSystemMockDTO
) {
  const systems = getAllSystems();
  const system = Object.values(systems)
    .flatMap((x) => x)
    .find((x) => x.id === id);
  if (!system) {
    throw new Error("Not found");
  }
  const updatedSystem = { ...payload, id: id, date: system.date };
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
  const systems = getAllSystems();
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
  return;
}
