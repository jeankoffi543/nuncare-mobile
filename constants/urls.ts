import { API_URL, API_PREFIX, GUARD_PREFIX } from '@env';

export const BASE = `${API_URL}/${API_PREFIX}/${GUARD_PREFIX}`;

export const API_URLS = {
  LOGIN: `${BASE}/auth/login`,
  REGISTER: `${BASE}/auth/register`,
  USERS: `${BASE}/likes`,
  PUBLICATIONS: `${BASE}/publications`,
  ADVERTISSEMENTS: `${BASE}/advertisements`,
};
