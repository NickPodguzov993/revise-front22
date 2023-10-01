export type CreateSystemDTO = {
  name: string;
  date: string;
  files: {
    idField: string;
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
    id?: number;
    idField: string;
    opType: string;
    project: string;
    date: string;
    sum: string;
    currency: string;
  }[];
};

export type DuplicateSystemsDTO = {
  date: string;
};
