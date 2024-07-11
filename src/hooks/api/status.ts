import { useMemo } from 'react';

import statusApi from '@/store/api/enhancedApi/status';

export const useStatus = () => {
  const { data } = statusApi.useStatusControllerFindAllQuery();

  const status = useMemo(() => data?.data || [], [data]);

  return {
    status,
  };
};
