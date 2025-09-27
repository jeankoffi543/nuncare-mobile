import { InsuranceResource } from './InsuranceResource';

export type SubscriberResource = {
  id_subscriber: number;
  last_name: string;
  first_name: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  insurances: InsuranceResource[];
  notifications: any[];
};
