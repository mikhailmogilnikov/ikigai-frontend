import createFetchClient from 'openapi-fetch';
import createReactQueryClient from 'openapi-react-query';

import { CONFIG } from '../config';
import { LocalStorageService } from '../lib/services/storage';

import { ApiPaths } from '.';

export const fetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});

export const rqClient = createReactQueryClient(fetchClient);

export const publicFetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});

export const publicRqClient = createReactQueryClient(publicFetchClient);

fetchClient.use({
  onRequest: ({ request }) => {
    const token = LocalStorageService.getItem('access_token');

    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }
  },
});
