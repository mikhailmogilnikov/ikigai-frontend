import { createOpenApiHttp } from 'openapi-msw';

import type { ApiPaths } from '~/shared/api';
import { CONFIG } from '~/shared/config';

export const http = createOpenApiHttp<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});
