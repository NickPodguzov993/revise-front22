export type PaymentsSystem = {
  id: number;
  name: string;
  files: PaymentsSystemFile[];
};

export type PaymentsSystemFile = {
  id: number;
  idField: string;
  opType: string;
  project: string;
  date: string;
  sum: string;
  currency: string;
};

export type SystemFormValues = {
  name: string;
  files: {
    idField: string;
    opType: string;
    project: string;
    date: string;
    sum: string;
    currency: string;
  }[];
};
