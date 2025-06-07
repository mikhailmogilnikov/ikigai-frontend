import createFetchClient from 'openapi-fetch';
import createReactQueryClient from 'openapi-react-query';

import { useSession } from '~/domains/global/entities/session';

import { CONFIG } from '../config';

import { ApiPaths } from '.';

export const fetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
  credentials: 'include',
});

export const rqClient = createReactQueryClient(fetchClient);

export const publicFetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
  credentials: 'include',
});

export const publicRqClient = createReactQueryClient(publicFetchClient);

// publicFetchClient.use({
//   onRequest: ({ request }) => {
//     const url = new URL(request.url);
//     const pathname = url.pathname as (typeof CONFIG.CREDENTIAL_ROUTES.PUBLIC)[number];

//     if (CONFIG.CREDENTIAL_ROUTES.PUBLIC.includes(pathname)) {
//       const newRequest = new Request(request, {
//         credentials: 'include',
//       });

//       return newRequest;
//     }

//     return request;
//   },
// });

fetchClient.use({
  onRequest: async ({ request }) => {
    const token = await useSession.getState().refreshToken();

    if (token) {
      // const url = new URL(request.url);
      // const pathname = url.pathname as (typeof CONFIG.CREDENTIAL_ROUTES.PRIVATE)[number];

      request.headers.set('Authorization', `Bearer ${token}`);

      // if (CONFIG.CREDENTIAL_ROUTES.PRIVATE.includes(pathname)) {
      //   const newRequest = new Request(request, {
      //     credentials: 'include',
      //   });

      //   return newRequest;
      // }

      // return request;
    } else {
      // eslint-disable-next-line lingui/no-unlocalized-strings
      return new Response(JSON.stringify({ message: 'Unauthorized', code: 401 }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
});
