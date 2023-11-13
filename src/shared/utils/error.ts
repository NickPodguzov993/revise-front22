export function getError(res: unknown) {
  const r = res as Record<string, string[] | string>;
  return r?.errors?.[0] || r?.error || "Что-то пошло не так...";
}
