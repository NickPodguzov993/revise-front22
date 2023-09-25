import { FileStatus } from "./model";

export function getShortDate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
}

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
