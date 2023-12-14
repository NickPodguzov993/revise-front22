export type SummaryDTO = {
  result: {
    data: Record<string, string | number | boolean | null>[];
    page: number;
    size: number;
    total: number;
  };
  error?: string;
};
