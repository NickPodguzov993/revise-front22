export type CreateSystemForm = {
  name: string;
  filesCount: number;
  idField?: string;
  opType?: string;
  date?: string;
  project?: string;
  amount?: string;
  currency?: string;
};

export type UpdateSystemForm = {
  name: string;
  filesCount: number;
  idField?: string;
  opType?: string;
  date?: string;
  project?: string;
  amount?: string;
  currency?: string;
};
