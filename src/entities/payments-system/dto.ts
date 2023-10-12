export type PaymentSystemDTO = {
  result: {
    field_id: string;
    field_type: string;
    field_date: string;
    field_project: string;
    field_sum: string;
    field_currency: string;
    formate_datetime: string;
  };
};

export type DuplicateSystemsDTO = {
  date: string;
};
