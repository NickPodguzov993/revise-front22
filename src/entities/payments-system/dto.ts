export type CreateSystemDTO = {
  name: string;
  date: string;
  files: {
    id: string;
    opType: string;
    project: string;
    date: string;
    sum: string;
    currency: string;
  }[];
};

export type UpdateSystemDTO = {
  name: string;
  files: {
    id: string;
    opType: string;
    project: string;
    date: string;
    sum: string;
    currency: string;
  }[];
};
