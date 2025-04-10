import ky, { HTTPError } from 'ky';

const defaultInstance = ky.create({
  prefixUrl: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

const guestInstance = defaultInstance.extend({});

const authInstance = defaultInstance.extend({
  hooks: {
    beforeRetry: [
      async ({ error, retryCount }) => {
        if (
          error instanceof HTTPError &&
          (error.response.status === 401 || error.response.status === 403) &&
          retryCount === 1
        ) {
          // TODO: Implement refresh token
          await new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                access_token: 'token',
              });
            }, 1000);
          });
        }
      },
    ],
  },
  retry: {
    methods: ['get', 'post', 'put', 'patch', 'delete'],
    limit: 3,
    statusCodes: [401, 403],
  },
});

export const publicApi = guestInstance;
export const privateApi = authInstance;
