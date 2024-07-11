import { enhancedApi } from '@/store/api/gen/roles';

const roleApi = enhancedApi.enhanceEndpoints({
  addTagTypes: ['resources'],
  endpoints: {
    rolesControllerFindAllResources: { providesTags: ['resources'] },
  },
});

export default roleApi;
