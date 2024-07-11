import { useMemo } from 'react';

import systemLogApi from '@/store/api/enhancedApi/system-logs';

export const useSystemLogs = (leadId: string) => {
  const { data } = systemLogApi.useSystemLogsControllerFindAllQuery({
    leadId,
  });

  const systemLogs = useMemo(() => data?.data || [], [data]);

  return {
    systemLogs,
  };
};
