import { useMemo } from 'react';

import roleApi from '@/store/api/enhancedApi/roles';

export const useResources = () => {
  const { data, isLoading } = roleApi.useRolesControllerFindAllResourcesQuery();

  const resources = useMemo(() => data?.data.resources || [], [data]);
  const accessTypes = useMemo(() => data?.data.accessTypes || [], [data]);

  return {
    resources,
    accessTypes,
    isLoading,
  };
};
