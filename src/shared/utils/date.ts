/**
 * Returns date in format `YYYY-MM`
 */
export function getMonthDate(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
}
