import { enhancedApi } from '@/store/api/gen/leads';

const leadApi = enhancedApi.enhanceEndpoints({
  addTagTypes: [
    'lead',
    'leads',
    'publisher-options',
    'miner-options',
    'assigned-leads',
    'sales-agents-with-assigned-lead-count',
  ],
  endpoints: {
    leadsControllerCreate: {
      invalidatesTags: ['leads', 'miner-options', 'publisher-options'],
    },
    leadsControllerFindOne: {
      providesTags: ['lead'],
    },
    leadsControllerUpdate: {
      invalidatesTags: ['lead', 'leads'],
    },

    leadsControllerFindAll: { providesTags: ['leads'] },
    leadsControllerFindAllMiners: { providesTags: ['miner-options'] },
    leadsControllerFindAllPublishers: { providesTags: ['publisher-options'] },
    leadsControllerAcquireMinedLeads: { invalidatesTags: ['leads'] },
    leadsControllerAssignLeads: {
      invalidatesTags: [
        'leads',
        'assigned-leads',
        'sales-agents-with-assigned-lead-count',
      ],
    },
    leadsControllerMoveLeadToMainSanitizedDistro: { invalidatesTags: ['lead'] },
    leadsControllerMoveLeadToGraveyardDistro: { invalidatesTags: ['lead'] },
  },
});

export default leadApi;
