import { useMemo } from 'react';

import userApi from '@/store/api/enhancedApi/users';
import { UsersControllerFindAllSalesAgentsArgs } from '@/store/api/gen/users';

export const useSalesAgents = (args: UsersControllerFindAllSalesAgentsArgs) => {
  const { data } = userApi.useUsersControllerFindAllSalesAgentsQuery({
    ...args,
  });

  const salesAgents = useMemo(() => data?.data.salesAgents || [], [data]);

  return {
    salesAgents,
  };
};
