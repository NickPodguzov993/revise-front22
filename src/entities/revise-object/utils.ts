import { FileStatus } from "./model";

export function getFileStatusTitle(status: FileStatus) {
  switch (status) {
    case "empty":
      return "Не загружен";
    case "uploaded":
      return "Загружен";
    case "error":
      return "Ошибка";
    default:
      return "Неизвестно";
  }
}
