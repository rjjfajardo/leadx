import { enhancedApi } from '@/store/api/gen/companies';

const companyApi = enhancedApi.enhanceEndpoints({
  addTagTypes: ['companies'],
  endpoints: {
    companiesControllerFindAll: { providesTags: ['companies'] },
    companiesControllerCreate: {
      invalidatesTags: ['companies'],
    },
  },
});

export default companyApi;
