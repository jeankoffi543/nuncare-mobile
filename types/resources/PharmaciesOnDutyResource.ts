import { PharmacyOnDuty } from '../types';
import { PharmacyResource } from './PharmacyResource';

export type PharmaciesOnDutyResource = {
  id_duty: number;
  pharmacy: PharmacyResource;
  start_date: string | null;
  end_date: string | null;
  duty_type: PharmacyOnDuty;
};
