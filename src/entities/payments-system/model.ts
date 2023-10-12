export type PaymentsSystem = {
  id: number;
  name: string;
  filesCount: number;
  idField?: string;
  opType?: string;
  project?: string;
  date?: string;
  amount?: string;
  currency?: string;
  // files: PaymentsSystemFile[];
};
