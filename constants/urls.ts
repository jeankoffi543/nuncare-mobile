import { API_URL, API_PREFIX, GUARD_PREFIX, CI_LAT, CI_LONG } from '@env';

export const BASE = `${API_URL}/${API_PREFIX}/${GUARD_PREFIX}`;

export const API_URLS = {
  LOGIN: `${BASE}/auth/login`,
  REGISTER: `${BASE}/auth/register`,
  USERS: `${BASE}/likes`,
  PUBLICATIONS: `${BASE}/publications`,
  ADVERTISSEMENTS: `${BASE}/advertisements`,
  PHARMACIES_ON_DUTY: `${BASE}/pharmacies_on_duties`,
  PHARMACIES: `${BASE}/pharmacies`,
};

export const MAP = {
  CI_LAT: CI_LAT,
  CI_LONG: CI_LONG,
};
