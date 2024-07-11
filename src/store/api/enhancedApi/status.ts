import { enhancedApi } from '@/store/api/gen/status';

const statusApi = enhancedApi.enhanceEndpoints({
  addTagTypes: ['status'],
  endpoints: {
    statusControllerFindAll: {
      providesTags: ['status'],
    },
  },
});

export default statusApi;
