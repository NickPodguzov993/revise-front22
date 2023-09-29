import { getPaymentsSystemsByDateMock } from "../systems/api";

function getAllReviseObjectsMock(): Record<
  string,
  { id: number; name: string; files: { id: number; status: string }[] }[]
> {
  let saved = localStorage.getItem("revise-objects");
  if (!saved) {
    localStorage.setItem("revise-objects", "{}");
    saved = "{}";
  }
  return JSON.parse(saved);
}

function getReviseObjectsByDateMock(date: string) {
  const allObjects = getAllReviseObjectsMock();
  let objects = allObjects[date];
  if (!objects?.length) {
    objects = [
      {
        id: Date.now(),
        name: "Табло",
        files: [{ id: Date.now(), status: "empty" }],
      },
    ];
  }

  const systems = getPaymentsSystemsByDateMock(date);
  console.log(systems);
  const mapped = [
    objects.find((obj) => obj.name === "Табло")!,
    ...systems.map((sys) => {
      const obj = objects.find((obj) => sys.id === obj.id);
      return {
        id: sys.id,
        name: sys.name,
        files: sys.files.map((f) => ({
          id: f.id,
          status: obj?.files.find((x) => x.id === f.id)?.status || "empty",
        })),
      };
    }),
  ];
  const updated = {
    ...allObjects,
    [date]: [...mapped],
  };
  localStorage.setItem("revise-objects", JSON.stringify(updated));
  return mapped;
}

export function getReviseObjectsMock(date: string) {
  return getReviseObjectsByDateMock(date);
}

export function uploadReviseObjectFileMock() {}

export function deleteReviseObjectFileMock(id: number) {
  // const allObjects = getAllReviseObjectsMock()
  // Object.entries(allObjects).find(([date, obj]) => )
  console.log(id);
}
