import { PharmacyStatus } from '../types';
import { PharmaciesOnDutyResource } from './PharmaciesOnDutyResource';

export type PharmacyResource = {
  id_pharmacy: number;
  duty: PharmaciesOnDutyResource;
  code: string;
  name: string;
  address: string;
  phone: string;
  latitude: string;
  longitude: string;
  opening_hours: string;
  status: PharmacyStatus;
};
