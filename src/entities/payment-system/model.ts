export type PaymentSystem = {
  id: number;
  name: string;
  files: PaymentSystemFile[];
};

export type PaymentSystemFile = {
  id: number;
  fields: {
    name: string;
    destination: string;
  }[];
};
