export type ScoreboardDTO = {
  result: {
    marbella_id: string;
    week_of_date: string;
    system: string;
    project: string;
    country: string;
    currency: string;
    date: string;
    player_id: string;
    amount_currency: string;
    amount_usd: string;
    type: string;
    error_description: string;
    //   formate_datetime: string;
  };
  error?: string;
};
