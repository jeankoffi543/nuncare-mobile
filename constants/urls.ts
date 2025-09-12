import { API_URL, API_PREFIX, GUARD } from '@env';

export const BASE = `${API_URL}/${API_PREFIX}/${GUARD}`;

export const API_URLS = {
  LOGIN: `${BASE}/auth/login`,
  REGISTER: `${BASE}/auth/register`,
  USERS: `${BASE}/likes`,
};
