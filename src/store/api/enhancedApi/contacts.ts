import { enhancedApi } from '@/store/api/gen/contacts';

const contactApi = enhancedApi.enhanceEndpoints({
  addTagTypes: ['contacts', 'lead'],
  endpoints: {
    contactsControllerCreate: {
      invalidatesTags: ['lead'],
    },
    contactsControllerUpdate: {
      invalidatesTags: ['lead'],
    },
    contactsControllerCreateContactLog: {
      invalidatesTags: [],
    },
  },
});

export default contactApi;
