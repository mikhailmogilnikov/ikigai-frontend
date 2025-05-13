import { paths, components } from './sсhema/generated';

export { queryClientConfig } from './query-client-config';
export { rqClient, fetchClient } from './instance';

export type ApiPaths = paths;
export type ApiComponents = components['schemas'];
