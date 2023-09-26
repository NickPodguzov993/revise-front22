import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMonthDate } from "../utils";

export function usePersistedDate() {
  const [params, setParams] = useSearchParams({
    date: getMonthDate(new Date()),
  });
  const [date, setDate] = useState(new Date(params.get("date")!));

  function onDateChange(date: Date) {
    setDate(date);
    setParams({ date: getMonthDate(date) });
  }

  return [date, onDateChange] as const;
}
