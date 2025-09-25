import { MedicineScheme } from '../types';
import { FormResource } from './FormResource';
import { InsuranceResource } from './InsuranceResource';

export type MedicineResource = {
  id_medicine: number;
  product_code: string;
  trade_name: string;
  therapeutic_group: string;
  dci: string;
  category: string;
  form: FormResource;
  price: number;
  scheme: MedicineScheme;
  insurances: InsuranceResource[];
};
