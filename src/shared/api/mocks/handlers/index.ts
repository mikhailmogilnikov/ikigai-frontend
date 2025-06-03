import { delay, http } from 'msw';

import { CONFIG } from '~/shared/config';

import { educationHandlers } from './education';
import { admin_handlers } from './admin';
import { authHandlers } from './auth';
import { userHandlers } from './user';

export const handlers = [
  http.all(`${CONFIG.API_BASE_URL}/*`, async () => {
    await delay();
  }),
  ...educationHandlers,
  ...admin_handlers,
  ...authHandlers,
  ...userHandlers,
];
