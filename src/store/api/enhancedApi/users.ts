import { enhancedApi } from '@/store/api/gen/users';

const userApi = enhancedApi.enhanceEndpoints({
  addTagTypes: ['sales-agents-with-assigned-lead-count'],
  endpoints: {
    usersControllerFindAllSalesAgents: {
      providesTags: ['sales-agents-with-assigned-lead-count'],
    },
  },
});

export default userApi;
