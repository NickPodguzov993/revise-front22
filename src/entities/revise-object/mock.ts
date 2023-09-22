import { ReviseObject } from "./model";

export const reviseObjectsMock: ReviseObject[] = [
  { name: "Табло", files: [{ id: 1, status: "uploaded" }] },
  {
    name: "Платежная система #1",
    files: [
      { id: 2, status: "error" },
      { id: 3, status: "empty" },
    ],
  },
  { name: "Платежная система #2", files: [{ id: 4, status: "uploaded" }] },
  { name: "Платежная система #3", files: [{ id: 5, status: "empty" }] },
  { name: "Платежная система #4", files: [{ id: 6, status: "empty" }] },
];
