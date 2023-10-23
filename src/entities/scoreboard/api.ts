import { Scoreboard } from "./model";

export function scoreboardDetailUrl(id: number) {
  return `/api/sc/${id}`;
}

export async function updateScoreboard(id: number, payload: Scoreboard) {
  return fetch(`/api/sc/${id}`, {
    method: "PUT",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      marbella_id: payload.marbellaId,
      week_of_date: payload.weekOfDate,
      system: payload.system,
      project: payload.project,
      country: payload.country,
      currency: payload.currency,
      date: payload.date,
      player_id: payload.playerId,
      amount_currency: payload.amountCurrency,
      amount_usd: payload.amountUsd,
      type: payload.type,
      error_description: payload.errorDescription,
      // formate_datetime: "string",
    }),
  });
}
