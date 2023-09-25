/**
 * Returns date in format `YYYY-MM`
 */
export function getMonthDate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
}
