import { baseApi as api } from '../baseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    rolesControllerFindAllResources: build.query<
      RolesControllerFindAllResourcesResponse,
      RolesControllerFindAllResourcesArgs
    >({
      query: () => ({ url: `/api/roles/resources` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type RolesControllerFindAllResourcesResponse =
  /** status 200  */ FindAllResourcesDto;
export type RolesControllerFindAllResourcesArgs = void;
export type ResourceType =
  | 'ALL'
  | 'USERS'
  | 'ROLES'
  | 'LEADS'
  | 'BOOKS'
  | 'TAGS'
  | 'STATUS'
  | 'COMMENTS'
  | 'SCHEDULED_ACTIVITIES'
  | 'CONFIGS'
  | 'COMPANIES'
  | 'CONTACTS';
export type ResourceEntity = {
  type: ResourceType;
  description: string;
};
export type AccessType =
  | 'ALL'
  | 'LIST'
  | 'READ'
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'PROCESS'
  | 'EXPORT'
  | 'UPLOAD'
  | 'DOWNLOAD';
export type AccessTypeEntity = {
  type: AccessType;
};
export type ResourceAndAccessTypeDto = {
  resources: ResourceEntity[];
  accessTypes: AccessTypeEntity[];
};
export type FindAllResourcesDto = {
  data: ResourceAndAccessTypeDto;
};
export const { useRolesControllerFindAllResourcesQuery } = injectedRtkApi;
