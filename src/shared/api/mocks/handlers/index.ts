import { delay, http } from 'msw';

import { CONFIG } from '~/shared/config';

import { educationHandlers } from './education';

export const handlers = [
  http.all(`${CONFIG.API_BASE_URL}/*`, async () => {
    await delay();
  }),
  ...educationHandlers,
];
