import { FileStatus } from "./model";

export function getFileStatusTitle(status: FileStatus) {
  switch (status) {
    case "empty":
      return "Не загружено";
    case "uploaded":
      return "Загружено";
    case "error":
      return "Ошибка";
    default:
      return "Неизвестно";
  }
}
