import { getPaymentsSystemsByDateMock } from "../systems/api";

function getAllReviseObjectsMock(): Record<
  string,
  {
    id: number;
    name: string;
    files: { id: number; status: string; message?: string }[];
  }[]
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
  const mapped = [
    objects.find((obj) => obj.name === "Табло")!,
    ...systems.map((sys) => {
      const obj = objects.find((obj) => sys.id === obj.id);
      return {
        id: sys.id,
        name: sys.name,
        files: sys.files.map((f) => {
          const file = obj?.files.find((x) => x.id === f.id);
          return {
            id: f.id,
            status: file?.status || "empty",
            message: file?.message,
          };
        }),
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

export function uploadReviseObjectFileMock(fileId: number) {
  const allObjects = getAllReviseObjectsMock();
  const found = Object.entries(allObjects).find(([, objects]) =>
    objects.some((obj) => obj.files.some((f) => f.id === fileId))
  );
  if (!found) {
    throw new Error("No file found");
  }
  const [date] = found;
  const objects = getReviseObjectsByDateMock(date);
  const targetObj = objects.find((obj) =>
    obj.files.some((f) => f.id === fileId)
  )!;
  const isError = !(Date.now() % 3);
  const updatedObj = {
    ...targetObj,
    files: [
      ...targetObj.files.filter((f) => f.id !== fileId),
      {
        ...targetObj.files.find((f) => f.id === fileId),
        status: isError ? "error" : "uploaded",
        message: isError
          ? "Не парьсе, тебе всего лишь выпал 0 в игре `Date.now() % 3`.\nПопробуй еще раз!"
          : undefined,
      },
    ],
  };
  const updated = {
    ...allObjects,
    [date]: [...objects.filter((obj) => obj.id !== targetObj.id), updatedObj],
  };
  localStorage.setItem("revise-objects", JSON.stringify(updated));
  return updatedObj;
}

export function deleteReviseObjectFileMock(fileId: number) {
  const allObjects = getAllReviseObjectsMock();
  const found = Object.entries(allObjects).find(([, objects]) =>
    objects.some((obj) => obj.files.some((f) => f.id === fileId))
  );
  if (!found) {
    return;
  }
  const [date] = found;
  const objects = getReviseObjectsByDateMock(date);
  const targetObj = objects.find((obj) =>
    obj.files.some((f) => f.id === fileId)
  )!;
  const updated = {
    ...allObjects,
    [date]: [
      ...objects.filter((obj) => obj.id !== targetObj.id),
      {
        ...targetObj,
        files: [
          ...targetObj.files.filter((f) => f.id !== fileId),
          {
            ...targetObj.files.find((f) => f.id === fileId),
            status: "empty",
            message: undefined,
          },
        ],
      },
    ],
  };
  localStorage.setItem("revise-objects", JSON.stringify(updated));
}
