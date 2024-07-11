import { enhancedApi } from '@/store/api/gen/system-logs';

const systemLogApi = enhancedApi.enhanceEndpoints({
  addTagTypes: ['systemLogs'],
  endpoints: {
    systemLogsControllerFindAll: {
      providesTags: ['systemLogs'],
    },
  },
});

export default systemLogApi;
