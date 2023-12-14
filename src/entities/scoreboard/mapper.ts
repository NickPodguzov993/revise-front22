import { Scoreboard } from "./model";
import { ScoreboardDTO } from "./dto";

export function mapScoreboard(
  dto: ScoreboardDTO | null | undefined
): Scoreboard | null {
  const res = dto?.result;
  if (!res) {
    return null;
  }
  return {
    marbellaId: res.marbella_id,
    weekOfDate: res.week_of_date,
    system: res.system,
    project: res.project,
    country: res.country,
    currency: res.currency,
    date: res.date,
    playerId: res.player_id,
    amountCurrency: res.amount_currency,
    amountUsd: res.amount_usd,
    type: res.type,
    errorDescription: res.error_description,
  };
}
