import { enhancedApi } from '@/store/api/gen/tags';

const tagsApi = enhancedApi.enhanceEndpoints({
  addTagTypes: ['tags'],
  endpoints: {
    tagsControllerFindAll: {
      providesTags: ['tags'],
    },
  },
});

export default tagsApi;
