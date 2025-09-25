import { InsuranceStatus } from '../types';
export type InsuranceResource = {
  id_insurance: number;
  name: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  status: InsuranceStatus;
  pivot: {
    card_number: string;
    start_date: string;
    end_date: string;
  };
};
